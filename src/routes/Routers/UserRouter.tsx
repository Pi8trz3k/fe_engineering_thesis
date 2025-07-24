import { Navigate, useRoutes } from "react-router-dom";
import UserLandingPage from "@/pages/user/UserLandingPage.tsx";
import UserLayout from "@/components/Elements/Layout/UserLayout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Trainings from "@/pages/user/Trainings.tsx";
import TrainersPage from "@/pages/user/TrainersPage.tsx";
import UserProfile from "@/pages/UserProfile.tsx";
import Achievements from "@/pages/user/Achievements.tsx";
import EmailConfirmationPage from "@/pages/EmailConfirmationPage.tsx";
import TrainerProfilePageWrapper from "@/pages/user/TrainerProfilePageWrapper.tsx";
import RequestsToTrainer from "@/pages/trainer/RequestsToTrainer.tsx";
import TrainerOpinions from "@/pages/user/TrainerOpinions.tsx";

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
        { index: true, element: <UserLandingPage /> },
        { path: "trainers", element: <TrainersPage /> },
        {
          path: "trainers/:trainerId",
          element: <TrainerProfilePageWrapper />,
        },
        { path: "trainings", element: <Trainings /> },
        { path: "requests", element: <RequestsToTrainer /> },
        { path: "trainer-opinions", element: <TrainerOpinions /> },
        { path: "achievements", element: <Achievements /> },
        { path: "profile", element: <UserProfile /> },
        { path: "confirm-email", element: <EmailConfirmationPage /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(userRoutes);
}
