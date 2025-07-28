import { UseAuth } from "@/hooks/useAuth.tsx";
import UserTrainings from "@/pages/user/UserTrainings.tsx";
import TrainerTrainings from "@/pages/trainer/TrainerTrainings.tsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Trainings() {
  const { role, accessToken } = UseAuth();
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode<{ user_id: number }>(accessToken);
      setUserId(decoded.user_id);
    }
  }, [accessToken]);

  if (userId === undefined) return <a>Ładowanie treningów</a>;

  return role === "user" ? (
    <UserTrainings userId={userId} />
  ) : (
    <TrainerTrainings />
  );
}
