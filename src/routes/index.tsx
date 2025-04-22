import AnonRouter from "./Routers/AnonRouter.tsx";
import AdminRouter from "./Routers/AdminRouter.tsx";
import UserRouter from "./Routers/UserRouter.tsx";
import { useAuth } from "@/hooks/useAuth.tsx";

export default function AppRoutes() {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AnonRouter />;
  } else if (role === "admin") {
    return <AdminRouter />;
  }
  return <UserRouter />;
}
