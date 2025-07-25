import { UseAuth } from "@/hooks/useAuth.tsx";
import UserTrainings from "@/pages/user/UserTrainings.tsx";
import TrainerTrainings from "@/pages/trainer/TrainerTrainings.tsx";

export default function Trainings() {
  const { role } = UseAuth();

  return role === "user" ? <UserTrainings /> : <TrainerTrainings />;
}
