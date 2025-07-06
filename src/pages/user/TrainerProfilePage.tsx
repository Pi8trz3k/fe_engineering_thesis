import emptyProfileCard from "@/assets/emptyProfileCard.avif";
import {
  TrainerBackend,
  TrainerProfilePageProps,
} from "@/pages/user/DataTypes/TrainersPageTypes.ts";
import { useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { Spin } from "antd";

export default function TrainerProfilePage({
  trainerId,
}: TrainerProfilePageProps) {
  const [trainer, setTrainer] = useState<TrainerBackend>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrainer = async () => {
      setLoading(true);
      try {
        const trainerResponse = await api.get(`/trainer/${trainerId}`);
        setTrainer(trainerResponse.data);
      } catch (error: any) {
        console.log(error);
        toast.error("Nie udało się pobrać danych");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:text-white">
        <div className="relative w-[70%] aspect-[4/3] mx-auto">
          <img
            src={emptyProfileCard}
            alt="trener image"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        <div>
          <div className="font-bold">
            {trainer?.name} {trainer?.last_name} (⭐ {trainer?.mean_of_stars})
          </div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div>
          <div>
            <a className="font-semibold">Dostępne miasta: </a>
            {[...new Set(trainer?.locations?.map((loc) => loc.city))].join(
              ", ",
            ) || "Brak miast."}
          </div>
          <div>
            {" "}
            <span className="font-semibold">Specjalizacje: </span>
            {trainer?.types?.join(", ") || "Brak specjalizacji"}
          </div>
        </div>
        <div className="bg-red-300">ASKNDajsndajsndjasnd </div>
        <div className="bg-brown-300">{trainerId} </div>
      </div>
    </>
  );
}
