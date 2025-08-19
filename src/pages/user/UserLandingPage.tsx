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
  const [achievementsCount, setAchievementsCount] = useState<number | null>(
    null,
  );
  const [user, setUser] = useState<BackendUser>();
  const [monthlySummary, setMonthlySummary] = useState<{
    done: number;
    not_done: number;
    total: number;
  } | null>(null);
  const [trainerRelationsSummary, setTrainerRelationsSummary] = useState<{
    wait: number;
    agree: number;
  }>({ wait: 0, agree: 0 });
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
        console.error(error);
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

    const fetchAchievements = async () => {
      try {
        const response = await api.get(
          `/achievements/?user_id=${user?.user_id}`,
        );
        setAchievementsCount(response.data.length);
      } catch (error: any) {
        console.error(error);
        toast.error("Błąd podczas pobierania osiągnięc");
      }
    };

    const fetchWorkoutsCount = async () => {
      try {
        const response = await api.get(`/workouts/this_month/${user?.user_id}`);
        setMonthlySummary(response.data);
      } catch (error: any) {
        console.error(error);
        toast.error("Błąd podczas pobierania treningów");
      }
    };

    const fetchTrainerRelationsSummary = async () => {
      if (role === "trainer") {
        try {
          const response = await api.get(`/user-trainer/${user?.user_id}`);
          const relations = response.data;

          const summary = relations.reduce(
            (acc: { wait: number; agree: number }, relation: any) => {
              if (relation.trainer_agree === "wait") acc.wait += 1;
              if (relation.trainer_agree === "agree") acc.agree += 1;
              return acc;
            },
            { wait: 0, agree: 0 },
          );

          setTrainerRelationsSummary(summary);
        } catch (error: any) {
          console.error(error);
          toast.error("Błąd podczas pobierania relacji z trenerami");
        }
      } else {
        return;
      }
    };

    if (user?.user_id) {
      fetchNextTraining();
      fetchTrainerRelations();
      fetchAchievements();
      fetchWorkoutsCount();
      fetchTrainerRelationsSummary();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6 mt-4 items-center">
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">
        {role === "user" ? (
          <a>Witamy w panelu użytkownika!</a>
        ) : (
          <a>Witamy w panelu trenera</a>
        )}
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
                📅 {dayjs(nextTraining.workout_date).format("DD.MM.YYYY")}
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
        {monthlySummary && (
          <div className="border rounded-xl p-4 shadow-md text-center dark:bg-gray-200 bg-white">
            <h3 className="text-lg font-semibold mb-2">
              Twoje treningi w tym miesiącu
            </h3>
            <div className="text-base flex flex-col gap-1">
              <p>
                ✅ Wykonane: <strong>{monthlySummary.done}</strong>
              </p>
              <p>
                ❌ Niewykonane: <strong>{monthlySummary.not_done}</strong>
              </p>
              <p>
                📊 Łącznie: <strong>{monthlySummary.total}</strong>
              </p>
            </div>
          </div>
        )}
        <div className="border rounded-xl p-4 shadow-md text-center dark:bg-gray-200 bg-white">
          <h3 className="text-lg font-semibold mb-2">Twoje osiągnięcia</h3>
          {achievementsCount !== null ? (
            <p className="text-base">
              🏆Liczba twoich wszystkich osiągnięć:
              <strong> {achievementsCount}</strong>
            </p>
          ) : (
            <p className="text-sm text-gray-500">Ładowanie danych...</p>
          )}
        </div>
        {role === "user" ? (
          <div className="border rounded-xl p-4 shadow-md text-center dark:bg-gray-200 bg-white">
            <h3 className="text-lg font-semibold mb-2">Twoi trenerzy</h3>
            {trainerCount !== null ? (
              <p className="text-base text-center">
                👤 Trenerzy, z którymi współpracujesz:{" "}
                <strong>{trainerCount}</strong>
              </p>
            ) : (
              <p className="text-sm text-gray-500">Ładowanie danych...</p>
            )}
          </div>
        ) : (
          <div className="border rounded-xl p-4 shadow-md text-center dark:bg-gray-200 bg-white">
            <h3 className="text-lg font-semibold mb-2">Twoi podopieczni</h3>
            <p>
              🟩 Aktywni: <strong>{trainerRelationsSummary.agree}</strong>
            </p>
            <p>
              🟨 Oczekujący: <strong>{trainerRelationsSummary.wait}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
