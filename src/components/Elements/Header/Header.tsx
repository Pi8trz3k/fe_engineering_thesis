import { useState } from "react";
import { useAuth } from "@/hooks/useAuth.tsx";
import ThemeToggle from "@/components/Elements/Theme/ThemeToggle.tsx";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, role, logOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = () => {
    if (!isAuthenticated) {
      return (
        <>
          <AuthNavigationButton
            text="Zaloguj się"
            type="login"
            onClick={() => navigate("/login")}
          />
          <AuthNavigationButton
            text="Zarejestruj się"
            type="register"
            onClick={() => navigate("/register")}
          />
        </>
      );
    } else if (role === "admin") {
      return (
        <>
          <button>Admin Panel</button>
          <AuthNavigationButton
            text="Wyloguj się"
            type="logout"
            onClick={logOut}
          />
        </>
      );
    } else {
      return (
        <>
          <button>profile</button>
          <AuthNavigationButton
            text="Wyloguj się"
            type="logout"
            onClick={logOut}
          />
        </>
      );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-700 shadow-lg dark:shadow-sm dark:shadow-gray-500">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/" className="font-sourgummy text-2xl text-text-dark">
            BeFit.<span className="text-primary text-green-600">Always</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-dark h-8 w-8 md:hidden"
              aria-label="Otwórz menu"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-4">
              {menuItems()}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden items-center bg-gray-100 dark:bg-gray-700 shadow-md px-4 py-4 space-x-4 space-y-4">
            {menuItems()}
          </div>
        )}
      </header>
    </>
  );
}
