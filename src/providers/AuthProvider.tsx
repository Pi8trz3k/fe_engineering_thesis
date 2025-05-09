import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api.tsx";
import { toast } from "react-toastify";

interface RegisterData {
  name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

interface AuthContextType {
  accessToken: string | null;
  role: string;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  register: (data: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
}

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

        console.log("decoded: ", decoded);

        if (decoded.exp < currentTime) {
          logOut();
        } else {
          setRole(decoded.role);
        }
      } catch (error) {
        console.log("Wystąpił błąd: ", error);
        logOut();
      }
    }
  }, []);

  const logIn = async (email: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email); // important: `username`, not `email`
      formData.append("password", password);

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

  //TODO
  /*
  Trzeba dodać obsługe trenera, czyli jakby typ użytkownika który jest rejestrowany
  Nie wiem czy będzie to dodanie zwykłego type: string do parametrów ale wiadomo
   */
  const register = async (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
  }) => {
    try {
      await api.post("/user/", data, {
        headers: { "Content-Type": "application/json" },
      });

      await logIn(data.email, data.password);

      navigate("/");
    } catch (error: any) {
      toast.error("Nie udało się zarejestrować");
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
