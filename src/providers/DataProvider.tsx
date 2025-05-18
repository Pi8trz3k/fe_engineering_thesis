import { createContext, ReactNode, useEffect, useState } from "react";
import {
  AdminData,
  DataContextType,
  RoleData,
} from "@/providers/DataTypes/DataProviderTypes.ts";
import { UseAuth } from "@/hooks/useAuth.tsx";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";

export const DataContext = createContext<DataContextType>({
  data: {},
});

export default function DataProvider({ children }: { children: ReactNode }) {
  const { role, isAuthenticated } = UseAuth();
  const [data, setData] = useState<RoleData>({});

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        if (role === "admin") {
          const response = await api.get("/user/get-all-users");
          const result: AdminData = {
            usersCount: response.data.users,
            trainersCount: response.data.trainers,
            adminsCount: response.data.admins,
          };
          setData({ admin: result });
        }
      } catch (error: any) {
        console.error(error);
        toast.error("Wystąpił błąd podczas pobierania danych: ", error.message);
      }
    };
    fetchData();
  });

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}
