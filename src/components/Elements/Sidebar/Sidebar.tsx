import { UseAuth } from "@/hooks/useAuth.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import * as React from "react";

export default function Sidebar() {
  const { role } = UseAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSiderOpen, setIsSiderOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <Link
      to={to}
      className="text-black dark:text-white hover:text-green-600 transition-colors"
    >
      {children}
    </Link>
  );

  const navigationLinks = () => {
    if (role === "user") {
      return (
        <>
          <NavLink to="/">Panel główny</NavLink>
          <NavLink to="/trainers">Trenerzy</NavLink>
          <NavLink to="/trainings">Twoje treningi</NavLink>
          <NavLink to="/achievements">Osiągnięcia</NavLink>
          <NavLink to="/profile">Profil</NavLink>
        </>
      );
    }

    if (role === "trainer") {
      return (
        <>
          <NavLink to="/">Panel główny</NavLink>
          <NavLink to="/clients">Podopieczni</NavLink>
          <NavLink to="/trainings">Twoje treningi</NavLink>
          <NavLink to="/profile">Profil</NavLink>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {!isMobile && (
        <aside className="fixed top-16 left-0 h-screen w-40 bg-white dark:bg-gray-700 shadow-lg p-4 dark:border-t-2 dark:border-gray-900 ">
          <nav className="flex flex-col gap-4 text-black dark:text-white font-medium transition-color duration-100">
            {navigationLinks()}
          </nav>
        </aside>
      )}

      {isMobile && (
        <>
          <Button
            type="text"
            icon={
              <MenuOutlined style={{ color: "#6EE7B7", fontSize: "40px" }} />
            }
            onClick={() => setIsSiderOpen(true)}
            className="absolute top-4 left-4 z-50 text-xl dark:text-white"
          />
          <Drawer
            title={
              <span className="text-xl font-semibold text-black">Menu</span>
            }
            placement="left"
            onClick={() => setIsSiderOpen(false)}
            open={isSiderOpen}
            styles={{
              header: {
                backgroundColor: "#bbf7d0",
              },
              body: {
                backgroundColor: "#dcfce7",
              },
            }}
          >
            <nav className="flex flex-col gap-4 text-black dark:text-white font-medium">
              {navigationLinks()}
            </nav>
          </Drawer>
        </>
      )}
    </>
  );
}
