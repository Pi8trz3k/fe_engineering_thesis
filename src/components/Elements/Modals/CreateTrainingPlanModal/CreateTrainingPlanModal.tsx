import { Modal, Input, Form } from "antd";
import { toast } from "react-toastify";

type CreateTrainingPlanModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
};

export default function CreateTrainingPlanModal({
  open,
  onClose,
  onCreate,
}: CreateTrainingPlanModalProps) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values.title);
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
      </Form>
    </Modal>
  );
}
