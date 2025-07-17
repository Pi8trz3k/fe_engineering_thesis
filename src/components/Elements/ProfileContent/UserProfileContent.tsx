import { CommonProfileContentProps } from "@/components/Elements/ProfileContent/DataTypes.ts";
import { ChangeEvent, useState } from "react";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import { Button, Input } from "antd";

export default function CommonProfileContent({
  user,
}: CommonProfileContentProps) {
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
      await api.patch(`/user/${user?.user_id}`, formData);
      toast.success("Dane zostały zaktualizowane.");
    } catch (error: any) {
      if (error.response.data.detail == "This email is already in use") {
        toast.error("Ten adres email jest już zajęty.");
      } else if (
        error.response.data.detail == "This phone number is already in use"
      ) {
        toast.error("Ten numer telefonu jest już zajęty.");
      } else {
        toast.error("Nie udało się zapisać zmian.");
      }
      console.error(error);
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
            Adres email:{" "}
            {user.is_mail_verified ? (
              <a className="font-normal text-green-project dark:text-green-500">
                {"Potwierdzony"}
              </a>
            ) : (
              <a className="font-normal text-red-700 dark:text-red-500">
                {"Niepotwierdzony"}{" "}
              </a>
            )}
          </label>
        </div>

        <div>
          <label className="font-semibold">
            Status:{" "}
            {user.status === "active" ? (
              <a className="font-normal text-green-project dark:text-green-500">
                {"Aktywny"}{" "}
              </a>
            ) : user.status === "not_active" ? (
              <a className="font-normal text-yellow-400"> {"Nieaktywny"} </a>
            ) : (
              <a className="font-normal text-red-700 dark:text-red-500">
                {"Zablokowany"}{" "}
              </a>
            )}
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
