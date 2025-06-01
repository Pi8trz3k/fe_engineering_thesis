import { useContext } from "react";
import { dataContext } from "@/providers/DataProvider.tsx";

export const UseData = () => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};
