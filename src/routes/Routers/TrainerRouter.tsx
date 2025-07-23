import { Navigate, useRoutes } from "react-router-dom";
import UserLandingPage from "@/pages/user/UserLandingPage.tsx";
import UserLayout from "@/components/Elements/Layout/UserLayout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import UserProfile from "@/pages/UserProfile";
import RequestsToTrainer from "@/pages/trainer/RequestsToTrainer.tsx";

export default function TrainerRouter() {
  const trainerRoutes = [
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
        { index: true, element: <UserLandingPage /> },
        { path: "trainings", element: <UserLandingPage /> },
        { path: "profile", element: <UserProfile /> },
        { path: "requests", element: <RequestsToTrainer /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(trainerRoutes);
}
