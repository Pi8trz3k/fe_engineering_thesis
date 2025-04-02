interface AuthNavigationButtonProps {
  text: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
}

export function AuthNavigationButton({
  text,
  onClick,
  bgColor,
  textColor,
}: AuthNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-${textColor} ${bgColor} font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
    >
      {text}
    </button>
  );
}
