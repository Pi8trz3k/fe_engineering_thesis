import { useRoutes } from "react-router-dom";
import LandingPage from "@/pages/anon/LandingPage.tsx";

export default function AnonRouter() {
  const anonRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/testing", element: <LandingPage /> },
  ];
  return useRoutes(anonRoutes);
}
