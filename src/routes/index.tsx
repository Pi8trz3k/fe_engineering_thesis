import { useRoutes } from "react-router-dom";
import LandingPage from "../pages/anon/LandingPage.tsx";
import AnonRouter from "./Routers/AnonRouter.tsx";
import AdminRouter from "./Routers/AdminRouter.tsx";
import UserRouter from "./Routers/UserRouter.tsx";

export default function AppRoutes() {
  // const { isAuthenticated, user } = useAuth();

  // if (!isAuthenticated) {
  //   return <AnonRouter />;
  // } else if (user?.role === "admin") {
  //   return <AdminRouter />;
  // }
  return <UserRouter />;

  // return useRoutes(commonRouter);
}
