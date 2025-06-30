import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { useState } from "react";

export const useFilterData = () => {
  const [cities, setCities] = useState([]);
  // const [trainerTypes, setTrainerTypes] = useState([]);

  const fetchFilterData = async () => {
    try {
      const citiesResponse = await api.get(`/city`);

      setCities(citiesResponse.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas pobierania danych");
    }
  };

  return {
    cities,
    // trainerTypes,
    fetchFilterData,
  };
};
