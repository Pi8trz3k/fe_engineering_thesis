import { Navigate, useRoutes } from "react-router-dom";
import AnonLandingPage from "@/pages/anon/AnonLandingPage.tsx";
import LoginPage from "@/pages/anon/LoginPage.tsx";
import RegisterPage from "@/pages/anon/RegisterPage.tsx";
import AnonLayout from "@/components/Elements/Layout/AnonLayout.tsx";
import SendResetRequestPasswordPage from "@/pages/anon/SendResetRequestPasswordPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import ResetPasswordPage from "@/pages/anon/ResetPasswordPage";

export default function AnonRouter() {
  const anonRoutes = [
    {
      path: "/",
      element: <AnonLayout />,
      errorElement: (
        <ErrorPage
          title="Coś poszło nie tak 😢"
          message="Spróbuj odświeżyć stronę lub wróć później."
        />
      ),
      children: [
        { index: true, element: <AnonLandingPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        {
          path: "login/request-password-reset",
          element: <SendResetRequestPasswordPage />,
        },
        { path: "login/password-reset", element: <ResetPasswordPage /> },
        { path: "*", element: <Navigate to="/login" /> },
      ],
    },
  ];
  return useRoutes(anonRoutes);
}
