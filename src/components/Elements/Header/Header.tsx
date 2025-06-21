import { UseAuth } from "@/hooks/useAuth.tsx";
import ThemeToggle from "@/components/Elements/Theme/ThemeToggle.tsx";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

export default function Header() {
  const { isAuthenticated, logOut } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const isAuthPages = pathname === "/login" || pathname === "/register";

  const menuItems = () => {
    if (!isAuthenticated) {
      return (
        <>
          <>
            <AuthNavigationButton
              text="Zaloguj się"
              type="login"
              onClick={() => {
                navigate("/login");
              }}
            />
            <AuthNavigationButton
              text="Zarejestruj się"
              type="register"
              onClick={() => {
                navigate("/register");
              }}
            />
          </>
        </>
      );
    } else {
      return (
        <>
          <button
            className="block md:hidden text-4xl transition-all duration-300 transform hover:scale-105 active:scale-95
            text-black dark:text-white "
            onClick={logOut}
          >
            <LogoutOutlined
              className="bg-gray-100 dark:bg-gray-700"
              title="Wyloguj się"
            />
          </button>

          <button
            className="hidden md:block px-7 py-3 rounded-sm font-semibold shadow-xl transition-all transform hover:scale-105
      active:scale-95 text-white dark:text-black bg-gray-800 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200"
            onClick={logOut}
          >
            Wyloguj się
          </button>
        </>
      );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-gray-100 dark:bg-gray-700 shadow-lg dark:shadow-none dark:shadow-gray-500">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/" className="font-sourgummy text-2xl dark:text-white">
            BeFit.<span className="text-primary text-green-600">Always</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {!isAuthPages && (
              <>
                <div className="sm:flex items-center space-x-4">
                  {menuItems()}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
