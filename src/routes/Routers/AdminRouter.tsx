import { Navigate, useRoutes } from "react-router-dom";
import AdminLayout from "@/components/Elements/Layout/AdminLayout.tsx";
import AdminPanel from "@/pages/admin/AdminPanel.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";

export default function AdminRouter() {
  const adminRoutes = [
    {
      path: "/",
      element: <AdminLayout />,
      errorElement: (
        <ErrorPage
          title="Coś poszło nie tak 😢"
          message="Spróbuj odświeżyć stronę lub wróć później."
        />
      ),
      children: [
        { index: true, element: <AdminPanel /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(adminRoutes);
}
