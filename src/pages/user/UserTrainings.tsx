import { useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateTrainingPlanModal from "@/components/Elements/Modals/CreateTrainingPlanModal/CreateTrainingPlanModal";
import {
  TrainingPlan,
  TrainingsProps,
} from "@/pages/user/DataTypes/TrainingsTypes.ts";

export default function UserTrainings({ userId }: TrainingsProps) {
  const [userTrainingPlans, setUserTrainingPlans] = useState<TrainingPlan[]>(
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateTrainingPlan = async (title: string) => {
    try {
      const response = await api.post("/training_plan", {
        client_id: userId,
        title: title,
        workouts: [],
      });

      const newPlan = await response.data;
      setUserTrainingPlans((prev) => [newPlan, ...prev]);
    } catch (error: any) {
      if (
        error.response.data.detail ===
        "You are not allowed to have more than 1 training plan"
      ) {
        toast.error("Przejdź na konto premium aby założyć więcej planów");
      } else {
        toast.error("Wystąpił błąd podczas tworzenia planu");
      }
      console.error(error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get(`/training_plan/user/${userId}`);
      setUserTrainingPlans(response.data);
    } catch (error: any) {
      if (error.response.status == 404) {
        toast.warn("Brak treningów");
      } else {
        console.error(error);
        toast.error("Wystąpił błąd podczas pobierania danych");
      }
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [userId]);

  const handleCreateNewTrainingPlan = () => {
    setIsModalOpen(true);
  };

  const handleViewTrainingPlan = (trainingPlanId: string) => {
    navigate(`/trainings/${trainingPlanId}`);
  };

  return (
    <>
      <CreateTrainingPlanModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTrainingPlan}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={handleCreateNewTrainingPlan}
          className="cursor-pointer border-2 border-dashed border-gray-400 dark:border-gray-200 rounded-xl flex
                     flex-col items-center justify-center p-6 hover:bg-green-100 dark:hover:bg-gray-800
                     transition-transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-500 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <p className="mt-2 text-gray-600 font-medium dark:text-white">
            Nowy plan treningowy
          </p>
        </div>

        {userTrainingPlans.map((plan: TrainingPlan) => (
          <div
            key={plan.training_plan_id}
            onClick={() => handleViewTrainingPlan(plan.training_plan_id)}
            className="cursor-pointer border rounded-xl shadow hover:shadow-md transition-transform hover:scale-105 bg-white
            dark:bg-gray-200 pt-5 pb-5
            flex items-start justify-center sm:items-center"
          >
            <h3 className="text-lg font-semibold text-center justify-center text-gray-800">
              {plan.title}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
