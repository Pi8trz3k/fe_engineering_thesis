import { Navigate, useRoutes } from "react-router-dom";
import LandingPage from "@/pages/anon/LandingPage.tsx";
import LoginPage from "@/pages/anon/LoginPage.tsx";
import RegisterPage from "@/pages/anon/RegisterPage.tsx";
import AnonLayout from "@/components/Elements/Layout/AnonLayout.tsx";
import ResetPasswordPage from "@/pages/anon/ResetPasswordPage.tsx";

export default function AnonRouter() {
  const anonRoutes = [
    {
      path: "/",
      element: <AnonLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "login/password-reset", element: <ResetPasswordPage /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(anonRoutes);
}
