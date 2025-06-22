import { UseAuth } from "@/hooks/useAuth.tsx";
import ThemeToggle from "@/components/Elements/Theme/ThemeToggle.tsx";
import { AuthNavigationButton } from "@/components/Elements/Buttons/AuthNavigationButton/AuthNavigationButton.tsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogoutOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logOut } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const isAuthPages = pathname === "/login" || pathname === "/register";

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const menuItems = () => {
    return (
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
    );
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
                {isAuthenticated ? (
                  <>
                    <button
                      className="block md:hidden text-4xl transition-all duration-300 transform hover:scale-105 active:scale-95
            text-black dark:text-white"
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
                ) : (
                  <>
                    <div className="hidden sm:flex items-center space-x-4">
                      {menuItems()}
                    </div>

                    <button
                      className="sm:hidden text-black dark:text-white text-2xl font-bold"
                      onClick={toggleMenu}
                      title="Menu"
                    >
                      {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {!isAuthPages && !isAuthenticated && isMobileMenuOpen && (
          <div className="sm:hidden px-4 pb-4">
            <div className="shadow-xl border border-green-700 dark:border-black rounded-lg p-4 space-x-5  justify-center flex">
              {menuItems()}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
