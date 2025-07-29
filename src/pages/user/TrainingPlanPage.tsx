import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrainingPlan } from "@/pages/user/UserTrainings.tsx";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import "dayjs/locale/pl";

dayjs.locale("pl");

type Workout = {
  client_id: number;
  exercises: Exercise[];
  is_training_done: boolean;
  title: string;
  trainer_id: number;
  training_plan_id: string;
  workout_date: string;
  workout_id: string;
};

type Exercise = {
  exercise_id: string;
  exercise_name: string;
  sets: string;
  weight: string;
  description: string;
  workout_id: string;
};

type WorkoutFormData = {
  title: string;
  exercises: Exercise[];
};

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

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf("month").day(); // 0 = niedziela

  useEffect(() => {
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

    fetchTrainingPlan();
  }, [trainingPlanId]);

  useEffect(() => {
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

    fetchUserWorkouts();
  }, [userTrainingPlan]);

  if (unauthorized) {
    return () => {
      toast.error("Brak dostępu");
    };
  }

  const handleOpenModal = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCreateWorkout = (values: WorkoutFormData) => {
    console.log("Dodano trening dla:", selectedDate, values);
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleUpdateTrainingPlanWorkout = async (title: string) => {
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
      const isToday = dayjs().isSame(currentMonth.date(i), "day");

      days.push(
        <div
          key={i}
          onClick={() => handleOpenModal(date)}
          className={`relative border rounded-lg p-3 text-sm cursor-pointer transition group ${
            isToday ? "border-green-project border-2" : "border-gray-300"
          }`}
        >
          <div className="font-semibold">
            {currentMonth.date(i).format("D (ddd)")}
          </div>
          <Tooltip title="Dodaj trening">
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-green-200/75 rounded-lg">
              <PlusOutlined className="text-green-600 text-2xl" />
            </div>
          </Tooltip>
        </div>,
      );
    }

    return days;
  };

  return (
    <div>
      <div className="mb-4">
        {editingTrainingPlanTitle ? (
          <Input
            value={trainingPlanTitle}
            onChange={(e) => handleUpdateTrainingPlanWorkout(e.target.value)}
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
      </div>

      <div className="flex items-center justify-between mb-4">
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
                      name={[name, "name"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Liczba serii"
                      name={[name, "sets"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Waga (kg)" name={[name, "weight"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Opis" name={[name, "notes"]}>
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
    </div>
  );
}
