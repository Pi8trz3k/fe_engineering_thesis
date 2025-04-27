interface AuthNavigationButtonProps {
  text: string;
  type: "login" | "register" | "logout";
  onClick: () => void;
}

export function AuthNavigationButton({
  text,
  type,
  onClick,
}: AuthNavigationButtonProps) {
  const variants = {
    login:
      "text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 dark:border dark:border-black",
    register:
      "text-white dark:text-black bg-gray-800 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200",
    logout:
      "text-white dark:text-black bg-gray-800 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`px-7 py-3 rounded-sm font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 
      active:scale-95 ${variants[type]} `}
    >
      {text}
    </button>
  );
}
