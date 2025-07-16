import { ChangeEvent, useState } from "react";
import { Input, Button } from "antd";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function ChangePasswordSection() {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!PASSWORD_REGEX.test(formData.new_password)) {
      toast.error(
        "Hasło musi mieć co najmniej 8 znaków, zawierać dużą, małą literę, cyfrę oraz znak specjalny",
      );
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      toast.error("Nowe hasła nie są zgodne.");
      return;
    }

    try {
      await api.post("/token/change-password", {
        old_password: formData.current_password,
        new_password: formData.new_password,
      });

      toast.success("Hasło zostało zmienione.");
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error: any) {
      if (error.response.data.detail == "Stare hasło jest nieprawidłowe") {
        toast.error("Aktualne hasło jest nieprawdiłowe");
      } else {
        toast.error("Nie udało się zmienić hasła.");
      }
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[100%] sm:w-[75%] flex flex-col gap-4 mt-8 max-w-md text-center pb-10">
        <h2 className="text-lg font-semibold ">Zmień hasło</h2>

        <Input.Password
          name="current_password"
          placeholder="Obecne hasło"
          value={formData.current_password}
          onChange={handleChange}
        />
        <Input.Password
          name="new_password"
          placeholder="Nowe hasło"
          value={formData.new_password}
          onChange={handleChange}
        />
        <Input.Password
          name="confirm_password"
          placeholder="Powtórz nowe hasło"
          value={formData.confirm_password}
          onChange={handleChange}
        />

        <Button type="primary" onClick={handleSubmit}>
          Zmień hasło
        </Button>
      </div>
    </div>
  );
}
