import { Navigate, useRoutes } from "react-router-dom";
import LandingPage from "@/pages/anon/LandingPage.tsx";
import UserLayout from "@/components/Elements/Layout/UserLayout.tsx";

export default function UserRouter() {
  const userRoutes = [
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(userRoutes);
}
