import { useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { UseAuth } from "@/hooks/useAuth.tsx";
import { jwtDecode } from "jwt-decode";
import TrainerRelationsTable from "@/components/Elements/Table/TrainerRelationsTable";

interface TrainersRelationsProps {
  client_trainer_id: number;
  user_id: number;
  trainer_id: number;
  message_to_trainer: string;
  trainer_agree: string;
}

export default function RequestsToTrainer() {
  const { role, accessToken } = UseAuth();
  const [data, setData] = useState<TrainersRelationsProps[]>([]);

  const fetchData = async () => {
    if (accessToken) {
      const decoded = jwtDecode<{ user_id: number }>(accessToken);
      const response = await api.get(`/user-trainer/${decoded.user_id}`);
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  return (
    <TrainerRelationsTable data={data} role={role} onRefresh={fetchData} />
  );
}
