import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import {
  DeleteTwoTone,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "dayjs/locale/pl";
import {
  Workout,
  WorkoutFormData,
  TrainingPlan,
  Exercise,
} from "./DataTypes/TrainingsTypes";

dayjs.locale("pl");

export default function TrainingPlanDetailsPage() {
  const { trainingPlanId } = useParams<{ trainingPlanId: string }>();
  const [userWorkouts, setUserWorkouts] = useState<Workout[]>([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [userTrainingPlan, setUserTrainingPlan] = useState<TrainingPlan>();
  const [editingTrainingPlanTitle, setEditingTrainingPlanTitle] =
    useState(false);
  const [trainingPlanTitle, setTrainingPlanTitle] = useState("");
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [userId, setUserId] = useState<number>();
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf("month").day(); // 0 = niedziela

  const originalExerciseIdsRef = useRef<string[]>([]);

  const fetchUserWorkouts = async () => {
    if (userTrainingPlan?.workouts !== undefined) {
      try {
        const responseUserWorkouts = await Promise.all(
          userTrainingPlan.workouts.map((workoutId: string) =>
            api.get(`/workouts/${workoutId}`),
          ),
        );
        setUserWorkouts(responseUserWorkouts.map((res) => res.data));
      } catch (error: any) {
        toast.error("Wystąpił błąd podczas pobierania treningów");
        console.log(error);
      }
    }
  };

  const fetchTrainingPlan = async () => {
    try {
      const responseUserTrainingPlan = await api.get(
        `/training_plan/${trainingPlanId}`,
      );
      setUserTrainingPlan(responseUserTrainingPlan.data);
      setTrainingPlanTitle(responseUserTrainingPlan.data.title);
    } catch (error: any) {
      setUnauthorized(true);
      if (error.response.status == 403) {
        toast.error("Brak dostępu");
        console.error(error);
      } else {
        toast.error("Wystąpił błąd podczas pobierania planu");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTrainingPlan();
  }, [trainingPlanId]);

  useEffect(() => {
    fetchUserWorkouts();
  }, [userTrainingPlan]);

  useEffect(() => {
    const fetchActualUser = async () => {
      try {
        const response = await api.get("/token/me");
        setUserId(response.data.user_id);
      } catch (error: any) {
        toast.error("Wystąpił błąd podczas pobierania danych!");
        console.log(error);
      }
    };

    fetchActualUser();
  }, []);

  if (unauthorized) {
    return () => {
      toast.error("Brak dostępu");
    };
  }

  const handleOpenModal = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCreateWorkout = async (values: WorkoutFormData) => {
    try {
      if (values.exercises === undefined) {
        values.exercises = [];
      }

      const response = await api.post(`/workouts`, {
        workout: {
          title: values.title,
          workout_date: selectedDate?.toISOString(),
          is_training_done: false,
          client_id: userId,
          training_plan_id: trainingPlanId,
        },
        exercises: values.exercises,
      });

      setUserWorkouts((prev) => [...prev, response.data]);

      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      console.log(error);
      toast.error("Wystąpił błąd podczas tworzenia treningu");
    }
  };

  const handleEditWorkout = async (values: WorkoutFormData) => {
    if (!selectedWorkout) return;

    try {
      // divide exercises to those that should be updated, added and deleted
      const existingExercises = values.exercises
        .filter((ex: Exercise) => ex.exercise_id) // with id
        .map((ex: Exercise) => ({
          exercise_id: ex.exercise_id,
          exercise_name: ex.exercise_name,
          sets: ex.sets,
          weight: ex.weight,
          description: ex.description,
        }));

      const newExercises = values.exercises
        .filter((ex: Exercise) => !ex.exercise_id) // new, withoud id
        .map((ex: Exercise) => ({
          exercise_name: ex.exercise_name,
          sets: ex.sets,
          weight: ex.weight,
          description: ex.description,
        }));

      const currentExerciseIds = existingExercises.map((ex) => ex.exercise_id);
      const deletedExerciseIds = originalExerciseIdsRef.current.filter(
        (id) => !currentExerciseIds.includes(id),
      );

      // update existing exercises
      await api.patch(`/workouts/${selectedWorkout.workout_id}`, {
        workout: {
          title: values.title,
          workout_date: selectedWorkout.workout_date,
          is_training_done: selectedWorkout.is_training_done ?? false,
        },
        exercises: existingExercises,
      });

      // add new exercises
      if (newExercises.length > 0) {
        await Promise.all(
          newExercises.map((exercise) =>
            api.patch(
              `/workouts/${selectedWorkout.workout_id}/exercises`,
              exercise,
            ),
          ),
        );
      }

      // delete exercises
      if (deletedExerciseIds.length > 0) {
        await Promise.all(
          deletedExerciseIds.map((id) =>
            api.delete(
              `/workouts/${selectedWorkout.workout_id}/exercises/${id}`,
            ),
          ),
        );
      }

      toast.success("Trening został zaktualizowany!");
      setIsWorkoutModalOpen(false);
      editForm.resetFields();

      const updatedWorkoutResponse = await api.get(
        `/workouts/${selectedWorkout.workout_id}`,
      );

      setUserWorkouts((prev) =>
        prev.map((w) =>
          w.workout_id === selectedWorkout.workout_id
            ? updatedWorkoutResponse.data
            : w,
        ),
      );
    } catch (err) {
      toast.error("Błąd podczas aktualizacji treningu");
      console.error(err);
    }
  };

  const handleToggleWorkoutStatus = async () => {
    if (!selectedWorkout) return;

    try {
      await api.patch(`/workouts/${selectedWorkout.workout_id}`, {
        workout: {
          is_training_done: !selectedWorkout.is_training_done,
        },
      });

      toast.success("Zmieniono status treningu");

      // odśwież dane treningu
      const updatedWorkoutResponse = await api.get(
        `/workouts/${selectedWorkout.workout_id}`,
      );

      setUserWorkouts((prev) =>
        prev.map((w) =>
          w.workout_id === selectedWorkout.workout_id
            ? updatedWorkoutResponse.data
            : w,
        ),
      );

      setSelectedWorkout(updatedWorkoutResponse.data);
    } catch (error) {
      toast.error("Nie udało się zmienić statusu");
      console.error(error);
    }
  };

  const handleDeleteWorkout = async (workoutId: string | undefined) => {
    try {
      await api.delete(`/workouts/${workoutId}`);
      toast.success("Trening został usunięty");

      await fetchTrainingPlan();
      await fetchUserWorkouts();

      setIsWorkoutModalOpen(false);
    } catch (err) {
      toast.error("Błąd podczas usuwania treningu");
      console.error(err);
    }
  };

  const handleUpdateTrainingPlanTitle = async (title: string) => {
    try {
      await api.patch(`/training_plan/${trainingPlanId}`, { title: title });
    } catch (error: any) {
      if (error.response.status == 403) {
        toast.error("Nie masz uprawnień do edycji nazwy planu treningowego");
        console.log(error);
      } else {
        console.log(error);
        toast.error("Wystąpił błąd podczas aktualizacji nazwy treningu");
      }
    }
    setTrainingPlanTitle(title);
  };

  const handleDeleteTrainingPlan = async (trainingPlanId?: string) => {
    try {
      await api.delete(`/training_plan/${trainingPlanId}`);
      toast.success("Plan treningowy został usunięty");
      navigate("/trainings");
    } catch (err) {
      toast.error("Błąd podczas usuwania planu treningowego");
      console.error(err);
    }
  };

  const handleOpenWorkoutModal = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsWorkoutModalOpen(true);
    originalExerciseIdsRef.current = workout.exercises.map(
      (ex) => ex.exercise_id,
    );
    editForm.setFieldsValue({
      title: workout.title,
      exercises: workout.exercises.map((ex) => ({
        exercise_id: ex.exercise_id,
        workout_id: ex.workout_id,
        exercise_name: ex.exercise_name,
        sets: ex.sets,
        weight: ex.weight,
        description: ex.description,
      })),
    });
  };

  const handleCloseWorkoutModal = () => {
    setSelectedWorkout(null);
    setIsWorkoutModalOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentMonth.date(i).toDate();
      const isToday = dayjs().isSame(date, "day");
      const formattedDate = dayjs(date).format("YYYY-MM-DD");

      const workoutsForDay = userWorkouts.filter(
        (workout) =>
          dayjs(workout.workout_date).format("YYYY-MM-DD") === formattedDate,
      );

      days.push(
        <div
          key={i}
          className={`relative border rounded-lg p-3 text-sm cursor-pointer transition group dark:text-white ${
            isToday ? "border-green-project border-2" : "border-gray-300"
          }`}
        >
          <div className="font-semibold">{dayjs(date).format("D (ddd)")}</div>

          <div className="mt-2 space-y-1">
            {workoutsForDay.map((workout) => (
              <div
                key={workout.workout_id}
                className={`border text-green-800 text-xs rounded px-2 py-1 hover:bg-green-300
      ${workout.is_training_done ? "bg-gray-200" : "bg-green-100"}
    `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenWorkoutModal(workout);
                }}
              >
                {workout.title}
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-center md:hidden">
            <Tooltip title="Dodaj trening">
              <PlusOutlined
                className="text-green-600 text-2xl cursor-pointer"
                onClick={() => handleOpenModal(date)}
              />
            </Tooltip>
          </div>

          <div className="mt-2 hidden md:group-hover:flex items-center justify-center">
            <Tooltip title="Dodaj trening">
              <PlusOutlined
                className="text-green-600 text-2xl cursor-pointer"
                onClick={() => handleOpenModal(date)}
              />
            </Tooltip>
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div>
      <div className="mb-4 text-center jusitfy-center dark:text-white">
        {editingTrainingPlanTitle ? (
          <Input
            value={trainingPlanTitle}
            onChange={(e) => handleUpdateTrainingPlanTitle(e.target.value)}
            onBlur={() => setEditingTrainingPlanTitle(false)}
            className="text-xl font-bold max-w-sm"
            autoFocus
          />
        ) : (
          <Tooltip title="Kliknij aby edytować tytuł">
            <h1
              onClick={() => setEditingTrainingPlanTitle(true)}
              className="text-2xl font-bold cursor-pointer hover:underline inline-block"
            >
              {trainingPlanTitle}
            </h1>
          </Tooltip>
        )}
        <Tooltip title="Usuń trening">
          <Button
            icon={<DeleteTwoTone twoToneColor="#ff0000" />}
            size="small"
            onClick={() => handleDeleteTrainingPlan(trainingPlanId)}
            className="ml-3"
          />
        </Tooltip>
      </div>

      <div className="flex items-center justify-between mb-4 dark:text-white">
        <Button
          icon={<LeftOutlined />}
          onClick={handlePrevMonth}
          aria-label="Poprzedni miesiąc"
        />
        <h2 className="text-lg font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <Button
          icon={<RightOutlined />}
          onClick={handleNextMonth}
          aria-label="Następny miesiąc"
        />
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        }}
      >
        {renderDays()}
      </div>

      <Modal
        open={isModalOpen}
        title={`Nowy trening — ${selectedDate?.toLocaleDateString("pl-PL")}`}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Zapisz"
        cancelText="Anuluj"
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateWorkout}>
          <Form.Item
            label="Tytuł treningu"
            name="title"
            rules={[{ required: true, message: "Podaj tytuł" }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="exercises">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <div
                    key={key}
                    className="border p-2 rounded mb-2 bg-gray-50 space-y-2"
                  >
                    <Form.Item
                      label="Nazwa ćwiczenia"
                      name={[name, "exercise_name"]}
                      rules={[
                        { required: true, message: "Podaj nazwę ćwiczenia" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Liczba serii"
                      name={[name, "sets"]}
                      rules={[
                        { required: true, message: "Podaj liczbe serii" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Waga (kg)"
                      name={[name, "weight"]}
                      rules={[{ required: true, message: "Podaj wagę" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Opis"
                      name={[name, "description"]}
                      rules={[{ required: true, message: "Podaj liczbe opis" }]}
                    >
                      <Input.TextArea rows={2} />
                    </Form.Item>
                    <Button danger type="link" onClick={() => remove(name)}>
                      Usuń ćwiczenie
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Dodaj ćwiczenie
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        open={isWorkoutModalOpen}
        title={
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <span className="text-lg font-semibold">
              Edytuj trening — {selectedWorkout?.title}
            </span>
            <Button
              type={selectedWorkout?.is_training_done ? "default" : "primary"}
              onClick={handleToggleWorkoutStatus}
              className="w-full sm:w-auto"
            >
              {selectedWorkout?.is_training_done
                ? "Oznacz jako niezrobiony"
                : "Oznacz jako zrobiony"}
            </Button>
            <Button
              danger
              size="small"
              onClick={() => handleDeleteWorkout(selectedWorkout?.workout_id)}
              className="md:mr-6"
            >
              Usuń trening
            </Button>
          </div>
        }
        onCancel={handleCloseWorkoutModal}
        onOk={() => editForm.submit()}
        okText="Zapisz zmiany"
        cancelText="Anuluj"
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={(values) => handleEditWorkout(values)}
        >
          <Form.Item
            label="Tytuł treningu"
            name="title"
            rules={[{ required: true, message: "Podaj tytuł" }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="exercises">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <div
                    key={key}
                    className="border p-2 rounded mb-2 bg-gray-50 space-y-2"
                  >
                    <Form.Item
                      label="Nazwa ćwiczenia"
                      name={[name, "exercise_name"]}
                      rules={[
                        { required: true, message: "Podaj nazwę ćwiczenia" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Liczba serii"
                      name={[name, "sets"]}
                      rules={[
                        { required: true, message: "Podaj liczbe serii" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Waga (kg)"
                      name={[name, "weight"]}
                      rules={[{ required: true, message: "Podaj wagę" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Opis"
                      name={[name, "description"]}
                      rules={[{ required: true, message: "Podaj liczbe opis" }]}
                    >
                      <Input.TextArea rows={2} />
                    </Form.Item>
                    <Button
                      danger
                      type="link"
                      onClick={() => {
                        remove(name);
                      }}
                    >
                      Usuń ćwiczenie
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Dodaj ćwiczenie
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
}
