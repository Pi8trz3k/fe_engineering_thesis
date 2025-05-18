import { useContext } from "react";
import { DataContext } from "@/providers/DataProvider.tsx";

export const UseData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};
