import { Table, Tag, Button, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import api from "@/lib/api.tsx";
import { BackendUser } from "@/providers/DataTypes/DataProviderTypes.ts";
import { toast } from "react-toastify";
import { TrainerBackend } from "@/pages/user/DataTypes/TrainersPageTypes.ts";

interface ClientTrainer {
  client_trainer_id: number;
  user_id: number;
  trainer_id: number;
  message_to_trainer: string;
  trainer_agree: string;
}

interface Props {
  data: ClientTrainer[];
  role: string;
  onRefresh: () => Promise<void>;
}

interface TableColumnsTypeProps extends BackendUser, ClientTrainer {}

export default function TrainerRelationsTable({
  data,
  role,
  onRefresh,
}: Props) {
  const [users, setUsers] = useState<BackendUser[]>([]);
  const [trainers, setTrainers] = useState<TrainerBackend[]>([]);

  const handleStatusChange = (id: number, status: string) => {
    try {
      api.patch(
        `/user-trainer/change-relation-status?relation_id=${id}&status=${status}`,
      );
      onRefresh();
    } catch (error: any) {
      console.error(error);
      toast.error("Wystąpił błąd podczas potwierdzenia relacji");
    }
  };

  useEffect(() => {
    /* First case is getting users to show their data
     *  Second cas is getting trainer to show their data */
    const fetchUsers = async () => {
      try {
        if (role === "trainer") {
          const usersResponse = await Promise.all(
            data.map((relation: ClientTrainer) =>
              api
                .get(`/user/${relation.user_id}`)
                .then((response) => response.data),
            ),
          );
          setUsers(usersResponse);
        } else {
          const trainersResponse = await Promise.all(
            data.map((relation: ClientTrainer) =>
              api
                .get(`/trainer/${relation.trainer_id}`)
                .then((response) => response.data),
            ),
          );
          setTrainers(trainersResponse);
        }
      } catch (error: any) {
        console.error(error);
        toast.error("Wystąpił błąd podczas pobierania danych");
      } finally {
        console.log("trainers response: ", trainers);
      }
    };

    fetchUsers();
  }, [data]);

  const mergedData = data.map((relation: ClientTrainer) => {
    if (role === "trainer") {
      const user = users.find(
        (u: BackendUser) => u.user_id === relation.user_id,
      );
      console.log("merged data: ", user);
      return {
        ...relation,
        ...user,
      };
    } else if (role === "user") {
      const trainer = trainers.find(
        (t: TrainerBackend) => t.user_id === relation.trainer_id,
      );
      console.log("merged data: ", trainer);
      return {
        ...relation,
        ...trainer,
      };
    }
  });

  const columns: TableColumnsType<TableColumnsTypeProps> = [
    ...(role === "trainer"
      ? [
          {
            title: "Klient",
            dataIndex: "userId",
            key: "userId",
            render: (_, record) => `${record.name} ${record.last_name}`,
            sorter: (a, b) => {
              const fullNameA = `${a.name} ${a.last_name}`.toLowerCase();
              const fullNameB = `${b.name} ${b.last_name}`.toLowerCase();
              return fullNameA.localeCompare(fullNameB);
            },
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Telefon",
            dataIndex: "phone_number",
            key: "phone_number",
          },
        ]
      : [
          {
            title: "Trener",
            dataIndex: "trainer_id",
            key: "trainer_id",
            render: (_, record) => `${record.name} ${record.last_name}`,
            sorter: (a, b) => {
              const fullNameA = `${a.name} ${a.last_name}`.toLowerCase();
              const fullNameB = `${b.name} ${b.last_name}`.toLowerCase();
              return fullNameA.localeCompare(fullNameB);
            },
          },
        ]),
    {
      title: "Wiadomość",
      dataIndex: "message_to_trainer",
      key: "message_to_trainer",
    },
    {
      title: "Status",
      dataIndex: "trainer_agree",
      key: "status",
      render: (agree: string) =>
        agree === "agree" ? (
          <Tag color="green">Zaakceptowane</Tag>
        ) : agree === "wait" ? (
          <Tag color="yellow">Oczekujące</Tag>
        ) : (
          <Tag color="red">Odrzucone</Tag>
        ),
      filters: [
        { text: "Zaakceptowany", value: "agree" },
        { text: "Oczekujący", value: "wait" },
        { text: "Odrzucony", value: "disagree" },
      ],
      onFilter: (_, record) => record.trainer_agree === _,
    },
    ...(role === "trainer"
      ? [
          {
            title: "Akcja",
            key: "action",
            render: (_, record) =>
              record.trainer_agree === "wait" ? (
                <>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleStatusChange(record.client_trainer_id, "agree")
                    }
                  >
                    Akceptuj
                  </Button>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleStatusChange(record.client_trainer_id, "disagree")
                    }
                    className="mt-5"
                  >
                    Odrzuć
                  </Button>
                </>
              ) : (
                <></>
              ),
          },
        ]
      : []),
  ];

  return (
    <div className="overflow-x-auto pt-5">
      <Table
        dataSource={mergedData}
        columns={columns}
        rowKey="message_to_trainer"
        scroll={{ x: true }}
        pagination={{
          pageSize: 15,
          position: ["bottomCenter"],
        }}
        rowClassName={"dark:bg-gray-300"}
      />
    </div>
  );
}
