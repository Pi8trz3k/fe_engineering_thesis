interface AuthNavigationButtonProps {
  text: "Login" | "Register";
  onClick?: () => void;
}

export function AuthNavigationButton({
  text,
  onClick,
}: AuthNavigationButtonProps) {
  const variants = {
    Login:
      "text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 dark:border dark:border-black",
    Register:
      "text-white dark:text-black bg-gray-800 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`px-7 py-3 rounded-sm font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 
      active:scale-95 ${variants[text]} `}
    >
      {text}
    </button>
  );
}
