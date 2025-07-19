import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterInputs } from "@/providers/DataTypes/AuthProviderTypes.ts";
import { toast } from "react-toastify";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { useSearchParams } from "react-router-dom";
import api from "@/lib/api.tsx";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<{ newPassword: string; confirmNewPassword: string }>();

  const onSubmit = async () => {
    if (!token) {
      toast.error("Nieprawidłowy link resetujący.");
      return;
    }

    try {
      await api.post(`/token/reset-password`, {
        token: token,
        new_password: getValues("newPassword"),
      });
      toast.success("Hasło zostało zmienione!");
    } catch (error) {
      toast.error("Wystąpił błąd podczas zmiany hasła");
      console.error("Nie udało zmienić hasła: ", error);
    }
  };

  return (
    <>
      <div className="flex items-center bg-white dark:bg-gray-400 p-5 pt-10 mt-10 mx-auto m-auto w-[90%] max-w-[300px] md:max-w-[500px] border rounded-xl border-gray-300 dark:border-gray-500">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Zresetuj swoje hasło
          </h2>
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="mb-1 font-medium">
              Hasło
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", {
                required: "Hasło jest wymagane",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                  message:
                    "Hasło musi mieć co najmniej 8 znaków, zawierać dużą i małą literę, cyfrę oraz znak specjalny",
                },
              })}
              className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
              placeholder="Podaj hasło"
            />
            {errors.newPassword && (
              <p className="text-red-600 dark:text-red-700">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmNewPassword" className="mb-1 font-medium">
              Potwierdź hasło
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              {...register("confirmNewPassword", {
                validate: (match) => {
                  const password = getValues("newPassword");
                  return match === password || "Hasła powinny być takie same";
                },
                required: "Hasło jest wymagane",
              })}
              className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
              placeholder="Podaj hasło ponownie"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-600 dark:text-red-700">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
          {/*    <Button*/}
          {/*      type="primary"*/}
          {/*      htmlType="submit"*/}
          {/*      className="mt-5 rounded-sm font-semibold shadow-xl transition-all duration-300 transform hover:scale-105*/}
          {/*active:scale-95"*/}
          {/*    >*/}
          {/*      Wyślij link resetujący*/}
          {/*    </Button>*/}
          <div className="flex flex-col space-y-5 text-md md:text-lg">
            <AuthNavigationButton
              text="Zmień hasło"
              type={"login"}
              typeButton="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
