import { Navigate, useRoutes } from "react-router-dom";
import AnonLandingPage from "@/pages/anon/AnonLandingPage.tsx";
import UserLayout from "@/components/Elements/Layout/UserLayout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";

export default function UserRouter() {
  const userRoutes = [
    {
      path: "/",
      element: <UserLayout />,
      errorElement: (
        <ErrorPage
          title="Coś poszło nie tak 😢"
          message="Spróbuj odświeżyć stronę lub wróć później."
        />
      ),
      children: [
        { index: true, element: <AnonLandingPage /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(userRoutes);
}
