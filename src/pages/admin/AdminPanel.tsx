import StatCard from "@/components/Elements/Cards/StatCard.tsx";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function AdminPanel() {
  const [usersCount, setUsersCount] = useState(0);
  const [trainersCount, setTrainersCount] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/get-all-users");
        setUsersCount(response.data.users);
        setTrainersCount(response.data.trainers);
        setAdminsCount(response.data.admins);
      } catch (error) {
        toast.error("Wystąpił błąd");
        console.error(error);
      }
    };
    fetchData();
  });

  return (
    <>
      <title>BeFit.Always - panel administratora</title>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-15 gap-y-5 pt-10">
        <StatCard cardText="Użytkownicy" value={usersCount} />
        <StatCard cardText="Trenerzy" value={trainersCount} />
        <StatCard cardText="Administratorzy" value={adminsCount} />
      </div>
    </>
  );
}
