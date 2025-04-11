interface AuthNavigationButtonProps {
  text: string;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
}

export function AuthNavigationButton({
  text,
  color,
  bgColor,
  onClick,
}: AuthNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${color} ${bgColor} px-7 py-3 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border`}
    >
      {text}
    </button>
  );
}
