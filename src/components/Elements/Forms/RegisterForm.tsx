import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "@/hooks/useAuth.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface RegisterInputs {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = UseAuth();

  const {
    register: reactFormRegister,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const payload = {
        name: data.name,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        phone_number: data.phoneNumber,
      };

      await register(payload);

      toast.success("Pomyślnie zarejestrowano!");
    } catch (error) {
      console.error("Nie udało się zarejestrować: ", error);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-400 p-5 pt-10 mt-10 mx-auto m-auto w-[90%] max-w-[300px] md:max-w-[500px] border rounded-xl border-gray-300 dark:border-gray-500">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Rejestracja</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">
            Imię
          </label>
          <input
            type="name"
            id="name"
            {...reactFormRegister("name", {
              required: "Imię jest wymagane",
            })}
            className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj imię"
          />
          {errors.name && (
            <p className="text-red-600 dark:text-red-700">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-1 font-medium">
            Nazwisko
          </label>
          <input
            type="lastName"
            id="lastName"
            {...reactFormRegister("lastName", {
              required: "Nazwisko jest wymagane",
            })}
            className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj nazwisko"
          />
          {errors.lastName && (
            <p className="text-red-600 dark:text-red-700">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="mb-1 font-medium">
            Numer telefonu
          </label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            {...reactFormRegister("phoneNumber", {
              required: "Numer telefonu jest wymagany",
              // validate:
            })}
            className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj numer telefonu"
            defaultValue="+48"
          />
          {errors.phoneNumber && (
            <p className="text-red-600 dark:text-red-700">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email" className="mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...reactFormRegister("email", {
              required: "Adres email jest wymagany",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Podaj poprawny adres email!",
              },
            })}
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-1 border invalid:border-red-700
            invalid:focus:ring-red-700 invalid:ring-1 invalid:ring-red-700"
            placeholder="Podaj email"
          />
          {errors.email && (
            <p className="text-red-600 dark:text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            {...reactFormRegister("password", {
              required: "Hasło jest wymagane",
            })}
            className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj hasło"
          />
          {errors.password && (
            <p className="text-red-600 dark:text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 font-medium">
            Potwierdź hasło
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...reactFormRegister("confirmPassword", {
              validate: (match) => {
                const password = getValues("password");
                return match === password || "Hasła powinny być takie same";
              },
              required: "Hasło jest wymagane",
            })}
            className="p-3 rounded-xl border bg-white border-black focus:outline-none focus:ring-1 focus:ring-success"
            placeholder="Podaj hasło ponownie"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 dark:text-red-700">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-5 text-md md:text-lg">
          <AuthNavigationButton
            text="Zarejestruj się"
            type="register"
            typeButton="submit"
          />

          <hr className="w-full border-t border-black" />

          <Link className="text-sm ml-auto mr-auto hover:underline" to="/login">
            <span>Masz już konto?</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
