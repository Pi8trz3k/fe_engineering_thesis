import AnonRouter from "./Routers/AnonRouter.tsx";
import AdminRouter from "./Routers/AdminRouter.tsx";
import UserRouter from "./Routers/UserRouter.tsx";
import { UseAuth } from "@/hooks/useAuth.tsx";

export default function AppRoutes() {
  const { role, isAuthenticated } = UseAuth();

  if (!isAuthenticated) {
    return <AnonRouter />;
  } else if (role === "admin") {
    return <AdminRouter />;
  }
  return <UserRouter />;
}
