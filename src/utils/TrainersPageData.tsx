import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { useState } from "react";

export const useFilterData = () => {
  const [cities, setCities] = useState([]);
  const [trainerTypes, setTrainerTypes] = useState([]);

  const fetchFilterData = async () => {
    try {
      const citiesResponse = await api.get(`/city`);
      const trainerTypesResponse = await api.get(`/trainer-type`);

      setCities(citiesResponse.data);
      setTrainerTypes(trainerTypesResponse.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    }
  };

  return {
    cities,
    trainerTypes,
    fetchFilterData,
  };
};

export const useTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 12;

  const fetchTrainers = async (page: number) => {
    setLoading(true);

    const skip = (page - 1) * PAGE_SIZE;

    try {
      const trainersResponse = await api.get(
        `/trainer?skip=${skip}&limit=${PAGE_SIZE}`,
      );
      console.log(trainersResponse);
      setTrainers(trainersResponse.data);
      setTotalCount(trainersResponse.data.length);
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    } finally {
      setLoading(false);
    }
  };

  return { trainers, loading, totalCount, fetchTrainers, PAGE_SIZE };
};
