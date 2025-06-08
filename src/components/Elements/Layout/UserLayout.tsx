import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Elements/Sidebar/Sidebar.tsx";

export default function UserLayout() {
  return (
    <div className="flex h-full w-full min-h-screen bg-gradient-to-br from-green-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-700 dark:to-black">
      <Sidebar />
      <main className="flex flex-col items-center justify-center h-full w-full p-5">
        <Outlet />
      </main>
    </div>
  );
}
