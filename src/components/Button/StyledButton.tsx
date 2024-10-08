import { cls } from "../../libs/utils";

interface StyledButtonProps {
  color: "black" | "orange" | "red" | "blue" | "green";
  text: string;
  cssClass?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

function StyledButton({
  text,
  onClick,
  color,
  cssClass,
  ...rest
}: StyledButtonProps) {
  const colorVariants = {
    black: "bg-black hover:bg-gray-800 active:ring-black",
    orange: "bg-orange-500 hover:bg-orange-600 active:ring-orange-500",
    blue: "bg-blue-500 hover:bg-blue-600 active:ring-blue-500",
    red: "bg-red-500 hover:bg-red-600 active:ring-red-500",
    green: "bg-green-500 hover:bg-green-600 active:ring-green-500",
  };
  return (
    <button
      onClick={onClick}
      className={cls(
        `w-auto px-4 py-2 mt-1 text-xs text-white transition rounded-md focus:outline-none active:ring-2 active:ring-offset-2 ${colorVariants[color]}`,
        cssClass ? `${cssClass}` : ""
      )}
      {...rest}
    >
      {text}
    </button>
  );
}

export default StyledButton;
