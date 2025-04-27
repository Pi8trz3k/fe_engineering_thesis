interface AuthNavigationButtonProps {
  text: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
  className?: string;
}

export function AuthNavigationButton({
  text,
  color,
  bgColor,
  onClick,
  className,
}: AuthNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${color} ${bgColor} px-7 py-3 rounded-sm font-semibold shadow-lg transition-all duration-300 transform 
      hover:scale-105 active:scale-95 ${className}`}
    >
      {text}
    </button>
  );
}
