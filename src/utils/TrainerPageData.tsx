import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  OpinionBackend,
  TrainerBackend,
} from "@/pages/user/DataTypes/TrainersPageTypes.ts";

export const useOpinions = () => {
  const [opinions, setOpinions] = useState<OpinionBackend>();
  const [opinionsLoading, setOpinionsLoading] = useState<boolean>(true);
  const [totalOpinionsCount, setTotalOpinionsCount] = useState<number>(0);
  const OPINION_PAGE_SIZE = 12;

  const fetchOpinions = async (trainerId: number, page: number) => {
    setOpinionsLoading(true);

    const skip = (page - 1) * OPINION_PAGE_SIZE;
    const params = {
      trainer_id: trainerId,
      skip,
      limit: OPINION_PAGE_SIZE,
    };

    try {
      const opinionsResponse = await api.get(`/opinion`, { params });
      setOpinions(opinionsResponse.data.opinions);
      setTotalOpinionsCount(opinionsResponse.data.total_count);
      console.log("opinions: ", opinions);
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    } finally {
      setOpinionsLoading(false);
    }
  };

  return {
    opinions,
    totalOpinionsCount,
    opinionsLoading,
    fetchOpinions,
    OPINION_PAGE_SIZE,
  };
};

export const useTrainer = () => {
  const [trainer, setTrainer] = useState<TrainerBackend>();
  const [trainerLoading, setTrainerLoading] = useState<boolean>(false);

  const fetchTrainer = async (trainerId: number) => {
    setTrainerLoading(true);

    try {
      const trainerResponse = await api.get(`/trainer/${trainerId}`);
      setTrainer(trainerResponse.data);

      if (trainerResponse.data.length === 0) {
        toast.info("Nie znaleziono danych");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    } finally {
      setTrainerLoading(false);
    }
  };

  return { trainer, trainerLoading, fetchTrainer };
};
