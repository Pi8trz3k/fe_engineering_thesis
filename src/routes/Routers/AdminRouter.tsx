import { useRoutes } from "react-router-dom";
import LandingPage from "../../pages/anon/LandingPage.tsx";

export default function AdminRouter() {
  const adminRoutes = [{ path: "/", element: <LandingPage /> }];
  return useRoutes(adminRoutes);
}
