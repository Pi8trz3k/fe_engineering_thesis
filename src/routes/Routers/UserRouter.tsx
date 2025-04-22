import { useRoutes } from "react-router-dom";
import LandingPage from "@/pages/anon/LandingPage.tsx";

export default function UserRouter() {
  const userRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/testing", element: <LandingPage /> },
  ];
  return useRoutes(userRoutes);
}
