import { Modal, Input, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";
import { UserTrainerRelation } from "@/pages/user/DataTypes/TrainingsTypes.ts";
import { BackendUser } from "@/providers/DataTypes/DataProviderTypes.ts";

const { Option } = Select;

type CreateTrainingPlanModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, clientId?: number) => void;
  role?: string;
  relations?: UserTrainerRelation[];
};

export default function CreateTrainingPlanModal({
  open,
  onClose,
  onCreate,
  role = "user",
  relations = [],
}: CreateTrainingPlanModalProps) {
  const [form] = Form.useForm();
  const [chosenClientId, setChosenClientId] = useState<number | undefined>(
    undefined,
  );
  const [users, setUsers] = useState<BackendUser[]>([]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values.title, values.client_id);
      form.resetFields();
      onClose();
    } catch (error: any) {
      if (
        error.errorFields[0].errors[0] === "Wprowadź nazwę planu treningowego"
      ) {
        toast.error("Podaj nazwę planu treningowego!");
      } else {
        console.error(error);
        toast.error("Wystąpił błąd");
      }
    }
  };

  useEffect(() => {
    if (role === "trainer" && relations.length > 0) {
      const fetchUsers = async () => {
        try {
          const usersResponse = await Promise.all(
            relations
              .filter((relation) => relation.trainer_agree === "agree")
              .map((relation) =>
                api
                  .get(`/user/${relation.user_id}`)
                  .then((response) => response.data),
              ),
          );
          setUsers(usersResponse);
        } catch (error: any) {
          console.error(error);
          toast.error("Wystąpił błąd podczas pobierania danych");
        }
      };
      fetchUsers();
    }
  }, [role, relations]);

  return (
    <Modal
      title="Nowy plan treningowy"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      okText="Zapisz"
      cancelText="Anuluj"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Nazwa planu"
          rules={[
            { required: true, message: "Wprowadź nazwę planu treningowego" },
          ]}
        >
          <Input placeholder="np. Redukcja 10 tygodni" />
        </Form.Item>
        {role === "trainer" && (
          <Form.Item name="client_id" label="Klient">
            <Select
              placeholder="Wybierz klienta"
              value={chosenClientId}
              onChange={(value) => setChosenClientId(value)}
              allowClear
              className="max-w-xs"
            >
              {users.map((user: BackendUser) => (
                <Option key={user.user_id}>
                  {user.name} {user.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
