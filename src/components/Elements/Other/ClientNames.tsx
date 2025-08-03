import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function ClientName({ userId }: { userId: number }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await api.get(`user/${userId}`);
        setName(`${response.data.name} ${response.data.last_name}`);
      } catch (error) {
        console.error(error);
        toast.error("Wystąpił błąd podczas pobierania danych");
      }
    };

    fetchName();
  }, [userId]);

  return <p className="text-sm text-gray-800 mt-2">{name}</p>;
}
