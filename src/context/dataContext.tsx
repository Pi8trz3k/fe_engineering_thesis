import { createContext } from "react";
import { DataContextType } from "@/providers/DataTypes/DataProviderTypes.ts";

export const dataContext = createContext<DataContextType>({
  data: {},
  fetchData: async () => {},
});
