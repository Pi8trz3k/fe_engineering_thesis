import { Navigate, useRoutes } from "react-router-dom";
import UserLandingPage from "@/pages/user/UserLandingPage.tsx";
import UserLayout from "@/components/Elements/Layout/UserLayout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import UserProfile from "@/pages/UserProfile";
import RequestsToTrainer from "@/pages/trainer/RequestsToTrainer.tsx";
import Trainings from "@/pages/user/Trainings.tsx";
import TrainingPlanDetailsPage from "@/pages/user/TrainingPlanPage.tsx";
import ClientTrainingPlanWrapper from "@/pages/trainer/ClientTrainingPlanWrapper.tsx";
import AchievementsPage from "@/pages/user/AchievementsPage.tsx";

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
        { path: "requests", element: <RequestsToTrainer /> },
        { path: "trainings", element: <Trainings /> },
        {
          path: "trainings/:trainingPlanId",
          element: <TrainingPlanDetailsPage />,
        },
        {
          path: "trainings/:clientId/:trainingPlanId",
          element: <ClientTrainingPlanWrapper />,
        },
        { path: "achievements", element: <AchievementsPage /> },
        { path: "profile", element: <UserProfile /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(trainerRoutes);
}
