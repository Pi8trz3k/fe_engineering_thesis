import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoginInputs } from "@/providers/DataTypes/AuthProviderTypes.ts";
import { Button } from "antd";
import api from "@/lib/api.tsx";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = async (data: { email: string }) => {
    try {
      await api.post(`/token/request-reset-password?email=${data.email}`);
      toast.info("Wysłano maila, sprawdź swoją skrzynkę!");
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania maila: ", error);
    }
  };

  return (
    <div className="flex items-center bg-white dark:bg-gray-400 p-5 pt-10 mt-10 mx-auto m-auto w-[90%] max-w-[300px] md:max-w-[500px] border rounded-xl border-gray-300 dark:border-gray-500">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Zapomniałeś hasła?
        </h2>

        <div className="flex flex-col relative">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Adres email jest wymagany" })}
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-1 border invalid:border-red-700
            invalid:focus:ring-red-700 invalid:ring-1 invalid:ring-red-700"
            placeholder="Podaj email"
          />
          {errors.email && (
            <p className="text-red-600 dark:text-red-700">
              {errors.email.message}
            </p>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className="mt-5 rounded-sm font-semibold shadow-xl transition-all duration-300 transform hover:scale-105
      active:scale-95"
          >
            Wyślij link resetujący
          </Button>
        </div>
      </form>
    </div>
  );
}
