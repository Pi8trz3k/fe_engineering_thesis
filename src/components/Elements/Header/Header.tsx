import { useState } from "react";
import { useAuth } from "@/hooks/useAuth.tsx";
import ThemeToggle from "@/components/Elements/Theme/ThemeToggle.tsx";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { Link } from "react-router";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-700 shadow-lg dark:shadow-sm dark:shadow-gray-500">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/" className="font-sourgummy text-2xl text-text-dark">
            BeFit.<span className="text-primary text-green-600">Always</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <AuthNavigationButton
              text="Login"
              color="text-black dark:text-white"
              bgColor="bg-white dark:bg-gray-800"
              className={
                "hover:bg-gray-200 dark:hover:bg-gray-700 dark:border dark:border-black"
              }
            />

            <AuthNavigationButton
              text="Register"
              color="text-white dark:text-black"
              bgColor="bg-gray-800 dark:bg-white"
              className={"hover:bg-gray-700 dark:hover:bg-gray-200"}
            />
          </div>
        </div>
      </header>
    </>
  );
}
