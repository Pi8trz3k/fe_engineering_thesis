import { Outlet } from "react-router-dom";
import Footer from "@/components/Elements/Footer/Footer.tsx";

export default function AnonLayout() {
  return (
    <div className="flex h-full w-full min-h-screen bg-gradient-to-br from-green-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-700  dark:to-black">
      <main className="flex flex-col items-center justify-center h-full w-full mb-10">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
