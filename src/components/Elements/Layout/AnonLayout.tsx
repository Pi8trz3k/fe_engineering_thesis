import { Outlet } from "react-router-dom";

export default function AnonLayout() {
  return (
    <div className="flex h-full w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark">
      <main className="flex flex-col items-center justify-center h-full w-full p-5">
        <Outlet />
      </main>
    </div>
  );
}
