import {
  TrainerBackendContent,
  TrainerProfileContentProps,
} from "@/components/Elements/ProfileContent/DataTypes.ts";
import { useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";

export default function TrainerProfileContent({
  trainerId,
}: TrainerProfileContentProps) {
  const [trainer, setTrainer] = useState<TrainerBackendContent | null>(null);

  useEffect(() => {
    if (!trainerId) return;

    const fetchActualTrainer = async () => {
      try {
        const response = await api.get(`/trainer/${trainerId}`);
        console.log("response", response.data);
        setTrainer(response.data);
      } catch (error: any) {
        toast.error("Wystąpił błąd podczas pobierania danych!");
        console.log(error);
      }
    };

    fetchActualTrainer();
  }, []);

  return (
    <>
      <div>Desc: {trainer?.description}</div>
      {/*<div>Desc: {trainer?.locations}</div>*/}
      <div>Types: {trainer?.types}</div>
    </>
  );
}
