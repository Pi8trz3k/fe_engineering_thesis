import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";
import {
  userTypeData,
  AuthContextType,
  LoginInputs,
  RegisterDataPayload,
} from "@/providers/DataTypes/AuthProviderTypes.ts";

export const authContext = createContext<AuthContextType>({
  accessToken: null,
  role: "anon",
  logIn: async () => {},
  logOut: () => {},
  register: async () => {},
  isAuthenticated: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [role, setRole] = useState<string>("anon");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<{ role: string }>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          logOut();
        } else {
          setRole(decoded.role);
        }
      } catch (error) {
        console.error("Wystąpił błąd: ", error);
        logOut();
      }
    }
  }, []);

  const logIn = async (data: LoginInputs) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", data.email); // important: `username`, not `email`
      formData.append("password", data.password);

      const response = await api.post("/token/login", formData.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const userAccessToken = response.data.access_token;

      setAccessToken(userAccessToken);
      localStorage.setItem("accessToken", userAccessToken);

      const decoded = jwtDecode<{ role: string }>(userAccessToken);
      setRole(decoded.role);

      navigate("/");
    } catch (error: any) {
      const statusCode = error.response.status;

      if (statusCode === 401) {
        toast.error("Nieprawidłowe dane logowania");
      } else if (statusCode === 404) {
        toast.error("Użytkownik nie istnieje");
      } else {
        toast.error("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.");
      }
      throw error;
    }
  };

  const logOut = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setRole("anon");

    navigate("/login");
    toast.info("Wylogowano pomyślnie");
  };

  const register = async (
    data: RegisterDataPayload,
    userType: userTypeData,
  ) => {
    const endpoint = userType === "user" ? "/user/" : "/trainer/";

    try {
      await api.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });

      await logIn({ email: data.email, password: data.password });

      navigate("/");
    } catch (error: any) {
      const message = error.response.data.detail;
      if (error.response.status == 422) {
        if (message === `User with email: ${data.email} already exists`) {
          toast.error("Użytkownik z podanym mailem już istnieje");
        } else if (
          message ===
          `User with phone number ${data.phone_number} already exists`
        ) {
          toast.error("Użytkownik z podanym numerem telefonu już istnieje");
        }
      } else {
        console.log(message);
        toast.error("Nie udało się zarejestrować");
      }

      throw error;
    }
  };

  return (
    <authContext.Provider
      value={{
        accessToken,
        role,
        logIn,
        logOut,
        register,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
