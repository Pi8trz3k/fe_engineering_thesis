import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  OpinionBackend,
  TrainerBackend,
} from "@/pages/user/DataTypes/TrainersPageTypes.ts";
import defaultAvatar from "@/assets/defaultAvatar.avif";

export const useOpinions = () => {
  const [opinions, setOpinions] = useState<OpinionBackend[]>([]);
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

export const usePicture = () => {
  const [img, setImg] = useState<string>();
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const fetchImage = async (trainerId: number) => {
    setImgLoading(true);

    try {
      const imageResponse = await api.get(`/file/${trainerId}`, {
        responseType: "blob",
      });
      const imageBlob = await imageResponse.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setImg(defaultAvatar);
      } else {
        console.error(error);
        toast.error("Wystąpił błąd podczas pobierania danych");
      }
    } finally {
      setImgLoading(false);
    }
  };

  return { img, imgLoading, fetchImage };
};
