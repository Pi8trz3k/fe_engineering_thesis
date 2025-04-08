interface AuthNavigationButtonProps {
  text: string;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
  fontSize?: string;
  padding?: string;
}

export function AuthNavigationButton({
  text,
  color,
  bgColor,
  onClick,
  fontSize,
  padding,
}: AuthNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${color} ${bgColor} ${fontSize} ${padding} shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border`}
    >
      {text}
    </button>
  );
}
