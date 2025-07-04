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

  const fetchTrainers = async (
    page: number,
    searchName: string,
    selectedCity: string | undefined,
    selectedType: string | undefined,
    selectedMinStars: number,
  ) => {
    setLoading(true);

    const skip = (page - 1) * PAGE_SIZE;
    const params = {
      skip,
      limit: PAGE_SIZE,
      name: searchName,
      city: selectedCity,
      trainer_type: selectedType,
      min_stars: selectedMinStars,
    };

    try {
      const trainersResponse = await api.get(`/trainer`, { params });
      console.log(trainersResponse);
      setTrainers(trainersResponse.data);
      setTotalCount(trainersResponse.data.length);

      if (trainersResponse.data.length === 0) {
        toast.info("Nie znaleziono trenerów");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    } finally {
      setLoading(false);
    }
  };

  return { trainers, loading, totalCount, fetchTrainers, PAGE_SIZE };
};
