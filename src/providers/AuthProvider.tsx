import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api.tsx";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  role: string;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  register: (
    name: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
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
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken"),
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
        console.log("Invalid token: ", accessToken, ", error: ", error);
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
      const refreshToken = response.data.refresh_token;

      setAccessToken(userAccessToken);
      localStorage.setItem("accessToken", userAccessToken);

      setRefreshToken(refreshToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode<{ role: string }>(userAccessToken);
      setRole(decoded.role);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setRefreshToken(null);
    localStorage.removeItem("refreshToken");
    setRole("anon");

    navigate("/");
  };

  //TODO
  /*
  Trzeba dodać obsługe trenera, czyli jakby typ użytkownika który jest rejestrowany
  Nie wiem czy będzie to dodanie zwykłego type: string do parametrów ale wiadomo
   */
  const register = async (
    name: string,
    last_name: string,
    email: string,
    phoneNumber: string,
    password: string,
  ) => {
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("last_name", last_name);
      formData.set("email", email);
      formData.set("phone_number", phoneNumber);
      formData.set("password", password);

      await api.post("/user/", formData);

      navigate("/");
    } catch (error) {
      console.log("Nie udało się zarejestrować: ", error);
    }
  };
  useEffect(() => {
    console.log("AuthProvider");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        role,
        logIn,
        logOut,
        register,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
