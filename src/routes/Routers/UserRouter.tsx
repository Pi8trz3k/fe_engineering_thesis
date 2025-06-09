import { Navigate, useRoutes } from "react-router-dom";
import UserLandingPage from "@/pages/user/UserLandingPage.tsx";
import UserLayout from "@/components/Elements/Layout/UserLayout.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Trainings from "@/pages/user/Trainings.tsx";
import Trainers from "@/pages/user/Trainers.tsx";
import UserProfile from "@/pages/UserProfile.tsx";
import Achievements from "@/pages/user/Achievements.tsx";

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
        { path: "trainings", element: <Trainings /> },
        { path: "trainers", element: <Trainers /> },
        { path: "profile", element: <UserProfile /> },
        { path: "achievements", element: <Achievements /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(userRoutes);
}
