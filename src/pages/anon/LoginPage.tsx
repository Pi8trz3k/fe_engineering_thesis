import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await logIn(email, password);
    } finally {
      console.log("logged in");
    }
  };

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-400 p-5 pt-10 mt-10 mx-auto m-auto w-[90%] max-w-[300px] md:max-w-[500px] border rounded-xl border-gray-300 dark:border-gray-500">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Logowanie</h2>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email jest wymagany" })}
            className="p-3 rounded-xl border bg-white border-gray-500 focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Hasło jest wymagane" })}
            className="p-3 rounded-xl border bg-white border-gray-500 focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj hasło"
          />
        </div>

        <div className="flex flex-col space-y-5 text-md md:text-lg">
          <AuthNavigationButton
            text="Zaloguj się"
            type={"login"}
            onClick={handleSubmit(onSubmit)}
          />

          <span className="text-md md:text-lg ml-auto mr-auto mt-3">
            Nie masz konta? Zarejestruj się
          </span>

          <AuthNavigationButton
            text="Zarejestruj się"
            type="register"
            onClick={() => navigate("/register")}
          />

          <span className="ml-auto mr-auto">Zapomniałeś hasła?</span>
        </div>
      </form>
    </div>
  );
}
