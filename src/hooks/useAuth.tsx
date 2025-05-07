import { useContext } from "react";
import { authContext } from "@/providers/AuthProvider.tsx";

export const UseAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
