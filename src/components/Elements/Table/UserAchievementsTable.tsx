import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import api from "@/lib/api";

import { toast } from "react-toastify";
import { Achievement, Exercise } from "@/pages/user/DataTypes/TrainingsTypes";

interface Props {
  data: Achievement[];
  onRefresh: () => Promise<void>;
}

interface TableRow extends Achievement, Partial<Exercise> {
  exercise_id: string;
}

export default function AchievementsTable({ data, onRefresh }: Props) {
  const [userExercises, setUserExercises] = useState<Exercise[]>([]);

  const fetchExercises = async () => {
    try {
      const responseUserExercises = await Promise.all(
        data.map((achievement: Achievement) =>
          api.get(`/workouts/exercise/${achievement.exercise_id}`),
        ),
      );
      setUserExercises(responseUserExercises.map((res) => res.data));
    } catch (error) {
      toast.error("Nie udało się pobrać danych ćwiczeń");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/achievements/${id}`);
      toast.success("Osiągnięcie zostało usunięte.");
      onRefresh();
    } catch (error) {
      toast.error("Nie udało się usunąć osiągnięcia.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [data]);

  const mergedData: TableRow[] = data.map((achievement) => {
    const exercise = userExercises.find(
      (e) => e.exercise_id === achievement.exercise_id,
    );
    return {
      ...achievement,
      ...exercise,
    };
  });

  const columns = [
    {
      title: "Nazwa ćwiczenia",
      dataIndex: "exercise_name",
      key: "exercise_name",
      render: (text: string) => text || <i>Brak danych</i>,
    },
    {
      title: "Serie",
      dataIndex: "sets",
      key: "sets",
    },
    {
      title: "Waga (kg)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Opis",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Akcje",
      key: "action",
      render: (_: any, record: TableRow) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDelete(record.achievement_id)}
        >
          Usuń
        </Button>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto pt-5 pr-5">
      <Table
        dataSource={mergedData}
        columns={columns}
        rowKey="achievement_id"
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
    </div>
  );
}
