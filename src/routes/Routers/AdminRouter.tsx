import { Navigate, useRoutes } from "react-router-dom";
import AdminLayout from "@/components/Elements/Layout/AdminLayout.tsx";
import AdminPanel from "@/pages/admin/AdminPanel.tsx";

export default function AdminRouter() {
  const adminRoutes = [
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminPanel /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ];
  return useRoutes(adminRoutes);
}
