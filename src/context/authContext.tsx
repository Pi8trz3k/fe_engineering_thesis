import { createContext } from "react";
import { AuthContextType } from "@/providers/DataTypes/AuthProviderTypes.ts";

export const authContext = createContext<AuthContextType>({
  accessToken: null,
  role: "anon",
  logIn: async () => {},
  logOut: () => {},
  register: async () => {},
  isAuthenticated: false,
});
