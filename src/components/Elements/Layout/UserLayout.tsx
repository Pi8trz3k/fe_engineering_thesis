import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Elements/Sidebar/Sidebar.tsx";

export default function UserLayout() {
  return (
    <div className="flex h-full w-full min-h-screen bg-gradient-to-br from-green-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Sidebar />
      <main className="flex flex-col flex-1 min-w-0 h-full w-full sm:pr-5 sm:px-5 pt-10 md:pl-44">
        <Outlet />
      </main>
    </div>
  );
}
