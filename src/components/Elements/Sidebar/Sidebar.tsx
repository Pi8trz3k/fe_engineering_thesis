import { UseAuth } from "@/hooks/useAuth.tsx";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { role } = UseAuth();

  const navigationLinks = () => {
    if (role === "user") {
      return (
        <>
          <Link to="/">Panel główny</Link>
          <Link to="/trainers">Trenerzy</Link>
          <Link to="/trainings">Twoje treningi</Link>
          <Link to="/achievements">Osiągnięcia</Link>
          <Link to="/profile">Profil</Link>
        </>
      );
    }

    if (role === "trainer") {
      return (
        <>
          <Link to="/">Panel główny</Link>
          <Link to="/clients">Podopieczni</Link>
          <Link to="/trainings">Twoje treningi</Link>
          <Link to="/profile">Profil</Link>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none p-4">
        <nav className="flex flex-col gap-4 text-gray-800 dark:text-white font-medium">
          {navigationLinks()}
        </nav>
      </aside>
    </>
  );
}
