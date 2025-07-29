import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrainingPlan } from "@/pages/user/UserTrainings.tsx";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";

type workout = {
  client_id: number;
  exercises: exercise[];
  is_training_done: boolean;
  title: string;
  trainer_id: number;
  training_plan_id: string;
  workout_date: string;
  workout_id: string;
};

type exercise = {
  exercise_id: string;
  exercise_name: string;
  sets: string;
  weight: string;
  description: string;
  workout_id: string;
};

export default function TrainingPlanDetailsPage() {
  const { trainingPlanId } = useParams<{ trainingPlanId: string }>();
  const [userTrainingPlan, setUserTrainingPlan] = useState<TrainingPlan>();
  const [userWorkouts, setUserWorkouts] = useState<workout[]>([]);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const responseUserTrainingPlan = await api.get(
          `/training_plan/${trainingPlanId}`,
        );
        setUserTrainingPlan(responseUserTrainingPlan.data);
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
          responseUserWorkouts.map((res) => console.log(res.data));
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

  return (
    <div className="p-6">
      <p className="text-gray-600 mt-2">Plan ID: {trainingPlanId}</p>
    </div>
  );
}
