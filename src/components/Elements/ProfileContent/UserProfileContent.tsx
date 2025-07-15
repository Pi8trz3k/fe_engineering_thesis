import api from "@/lib/api";
import { UserBackend } from "@/pages/UserProfile.tsx";
import { Button, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type UserProfileContentProps = {
  user?: UserBackend;
};

export default function UserProfileContent({ user }: UserProfileContentProps) {
  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let testData = {};
      console.log("formdata: ", formData);

      await api.patch(`/user/${user?.user_id}`, formData);
      toast.success("Dane zostały zaktualizowane.");
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się zapisać zmian.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-2">
        <div>
          <label className="font-semibold">Imię:</label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label className="font-semibold">Nazwisko:</label>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label className="font-semibold">Telefon:</label>
          <Input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">
            Status: <a className="font-normal">{user.status}</a>
          </label>
        </div>

        <Button
          type="primary"
          className="bg-green-600 text-white w-fit"
          loading={loading}
          onClick={handleSave}
        >
          Zapisz zmiany
        </Button>
      </div>
    </>
  );
}
