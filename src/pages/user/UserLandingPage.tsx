import { UseAuth } from "@/hooks/useAuth.tsx";
import { Alert, Button } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import api from "@/lib/api";
import { Workout } from "@/pages/user/DataTypes/TrainingsTypes.ts";
import { BackendUser } from "@/providers/DataTypes/DataProviderTypes.ts";
import { useNavigate } from "react-router-dom";

export default function UserLandingPage() {
  const { role, accessToken } = UseAuth();

  const [nextTraining, setNextTraining] = useState<Workout | null>(null);
  const [trainerCount, setTrainerCount] = useState<number | null>(null);
  const [user, setUser] = useState<BackendUser>();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await api.get("/token/me");
      setUser(response.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [accessToken]);

  useEffect(() => {
    const fetchNextTraining = async () => {
      try {
        const response = await api.get(`/workouts/next/${user?.user_id}`);
        setNextTraining(response.data);
      } catch (error: any) {
        console.log("Brak najbliższego treningu");
      }
    };

    const fetchTrainerRelations = async () => {
      try {
        const response = await api.get(`/user-trainer/${user?.user_id}`);
        const relations = response.data;

        const agreedRelations = relations.filter(
          (relation: any) => relation.trainer_agree === "agree",
        );

        setTrainerCount(agreedRelations.length);
      } catch (error: any) {
        console.error(error);
        toast.error("Błąd podczas pobierania relacji z trenerami");
      }
    };

    if (user?.user_id) {
      fetchNextTraining();
      fetchTrainerRelations();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6 mt-6 items-center">
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">
        Witamy w panelu użytkownika!
      </h1>
      <div className="w-[90%] md:w-[60%] space-y-6">
        {!user?.is_mail_verified && (
          <Alert
            message="Twój adres e-mail nie został potwierdzony"
            description="Sprawdź swoją skrzynkę i potwierdź swój adres email klikając w link podany w emailu."
            type="warning"
            showIcon
          />
        )}
        <div className="border rounded-xl p-4 shadow-md bg-white text-center mt-6 dark:bg-gray-200">
          <h3 className="text-lg font-semibold mb-2">Najbliższy trening</h3>
          {nextTraining ? (
            <div className="flex flex-col gap-1">
              <p className="text-base">
                📅 {dayjs(nextTraining.workout_date).format("DD.MM.YYYY HH:mm")}
              </p>
              <p className="text-base">🏋️‍♂️ {nextTraining.title}</p>
              <div className="mt-4 flex justify-center">
                <Button
                  type="primary"
                  className="w-fit mt-2"
                  onClick={() =>
                    navigate(`/trainings/${nextTraining.training_plan_id}`)
                  }
                >
                  Zobacz szczegóły
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Brak zaplanowanych treningów
            </p>
          )}
        </div>
        <div className="border rounded-xl p-4 shadow-md dark:bg-gray-200 bg-white">
          <h3 className="text-lg font-semibold mb-2">Twoi trenerzy</h3>
          {trainerCount !== null ? (
            <div className="flex items-center justify-between">
              <p className="text-base">
                👤 Trenerzy, z którymi współpracujesz:{" "}
                <strong>{trainerCount}</strong>
              </p>
              <Button
                type="link"
                onClick={() => navigate("/trainers")}
                className="text-green-500"
              >
                Zobacz trenerów
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Ładowanie danych...</p>
          )}
        </div>
      </div>
    </div>
  );
}
