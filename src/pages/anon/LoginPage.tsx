import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="flex items-center bg-gray-100 dark:bg-gray-400 p-5 pt-10 mt-10 mx-auto m-auto w-[90%] max-w-[300px] md:max-w-[500px] border rounded-xl border-gray-300 dark:border-gray-500">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Logowanie</h2>

        <div className="flex flex-col relative">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email jest wymagany" })}
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-1 border invalid:border-red-700
            invalid:focus:ring-red-700 invalid:ring-1 invalid:ring-red-700"
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
            {...register("password", { required: true })}
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

          <Link
            className="text-sm ml-auto mr-auto hover:underline"
            to="/login/password-reset"
          >
            <span>Nie pamiętasz hasła?</span>
          </Link>

          <hr className="w-full border-t border-black mt-2 mb-10" />

          <AuthNavigationButton
            text="Utwórz nowe konto"
            type="register"
            onClick={() => navigate("/register")}
          />
        </div>
      </form>
    </div>
  );
}
