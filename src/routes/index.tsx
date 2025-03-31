import { useRoutes } from "react-router-dom";
import LandingPage from "../pages/anon/LandingPage.tsx";

export default function AppRoutes() {
  const commonRouter = [{ path: "/", element: <LandingPage /> }];

  return useRoutes(commonRouter);
}
