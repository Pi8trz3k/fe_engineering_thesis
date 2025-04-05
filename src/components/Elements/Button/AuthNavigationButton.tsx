interface AuthNavigationButtonProps {
  text: string;
  onClick?: () => void;
  fontSize?: string;
  padding?: string;
  type?: string;
}

export function AuthNavigationButton({
  text,
  onClick,
  fontSize,
  padding,
  type,
}: AuthNavigationButtonProps) {
  let textColor;
  let bgColor;

  if (type == "register") {
    textColor = "text-white";
    bgColor = "bg-stone-950";
  }
  return (
    <button
      onClick={onClick}
      className={`${textColor} ${bgColor} ${fontSize} ${padding} shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border`}
    >
      {text}
    </button>
  );
}
