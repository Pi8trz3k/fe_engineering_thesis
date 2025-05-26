import { createContext, ReactNode, useEffect, useState } from "react";
import {
  AdminData,
  BackendUser,
  DataContextType,
  RoleData,
} from "@/providers/DataTypes/DataProviderTypes.ts";
import { UseAuth } from "@/hooks/useAuth.tsx";
import { toast } from "react-toastify";
import api from "@/lib/api.tsx";

export const dataContext = createContext<DataContextType>({
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
          const mappedUsers = responseAllUsers.data.map(
            (user: BackendUser) => ({
              userID: user.user_id,
              name: user.name,
              lastName: user.last_name,
              email: user.email,
              phoneNumber: user.phone_number,
              status: user.status,
              type: user.type,
              isMailVerified: user.is_mail_verified,
              isAdmin: user.is_admin,
            }),
          );

          const result: AdminData = {
            counts: {
              usersCount: responseCountUsers.data.users,
              trainersCount: responseCountUsers.data.trainers,
              adminsCount: responseCountUsers.data.admins,
            },
            users: mappedUsers,
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
    <dataContext.Provider value={{ data }}>{children}</dataContext.Provider>
  );
}
