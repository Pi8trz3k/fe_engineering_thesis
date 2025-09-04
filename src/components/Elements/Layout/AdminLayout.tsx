import { Outlet } from "react-router-dom";
import Footer from "@/components/Elements/Footer/Footer.tsx";

export default function AdminLayout() {
  return (
    <div className="flex h-full w-full min-h-screen bg-gray-200 dark:bg-gray-800 text-text-light dark:text-text-dark">
      <main className="flex flex-col h-full w-full p-5">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
