import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
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
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  role: "anon",
  logIn: async () => {},
  logOut: () => {},
  register: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken"),
  );
  const navigate = useNavigate();

  const isTokenExpired = () => {
    if (!accessToken) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp > currentTime : false;
    } catch (error) {
      console.error("Invalid token", error);
      return false;
    }
  };

  useEffect(() => {
    if (accessToken && !isTokenExpired) {
      logOut();
    }
  }, []);

  const logIn = async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("password", password);

      const response = await api.post("/token/login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const userAccessToken = response.data.access_token;
      setAccessToken(userAccessToken);
      localStorage.setItem("accessToken", userAccessToken);

      const refreshToken = response.data.refresh_token;
      setRefreshToken(refreshToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setRefreshToken(null);
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  useEffect(() => {
    console.log("AuthProvider");
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, role, logIn, logOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
