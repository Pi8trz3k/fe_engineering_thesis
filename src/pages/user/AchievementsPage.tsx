import { UseAuth } from "@/hooks/useAuth.tsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import api from "@/lib/api";
import UserAchievementsTable from "@/components/Elements/Table/UserAchievementsTable.tsx";

type Achievement = {
  achievement_id: string;
  exercise_id: string;
  user_id: string;
};

export default function AchievementsPage() {
  const { accessToken } = UseAuth();
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);

  const fetchAchievements = async () => {
    try {
      if (!accessToken) return;
      const decoded = jwtDecode<{ user_id: number }>(accessToken);
      const response = await api.get(
        `/achievements/?user_id=${decoded.user_id}`,
      );
      setUserAchievements(response.data);
    } catch (error) {
      toast.error("Nie udało się pobrać osiągnięć użytkownika.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [accessToken]);

  return (
    <>
      <UserAchievementsTable
        data={userAchievements}
        onRefresh={fetchAchievements}
      />
    </>
  );
}
