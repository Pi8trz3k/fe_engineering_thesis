import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Elements/Sidebar/Sidebar.tsx";

export default function UserLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-green-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Sidebar />
      <main className="flex flex-col flex-1 p-5 pt-20 md:pl-44">
        <Outlet />
      </main>
    </div>
  );
}
