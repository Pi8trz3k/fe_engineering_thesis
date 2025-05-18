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
          const responseCountUsers = await api.get("/user/get-all-users");
          const responseAllUsers = await api.get("/user");
          console.log("User: ", responseAllUsers);
          const result: AdminData = {
            counts: {
              usersCount: responseCountUsers.data.users,
              trainersCount: responseCountUsers.data.trainers,
              adminsCount: responseCountUsers.data.admins,
            },
            users: [
              {
                name: "Kacper",
                lastName: "Pietrzak",
                email: "test@example.com",
                phoneNumber: "+48123321123",
                type: "user",
                isMailVerified: true,
                isAdmin: false,
              },
            ],
          };
          setData({ admin: result });
        }
      } catch (error: any) {
        console.error(error);
        toast.error("Wystąpił błąd podczas pobierania danych: ", error.message);
      }
    };
    fetchData();
  }, [role, isAuthenticated]);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}
