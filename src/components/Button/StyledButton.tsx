import { cls } from "../../libs/utils";

interface StyledButtonProps {
  color: "black" | "orange" | "red" | "blue";
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
    orange: "bg-orange-400 hover:bg-orange-500 active:ring-orange-400",
    blue: "bg-blue-400 hover:bg-blue-500 active:ring-blue-400",
    red: "bg-red-400 hover:bg-red-500 active:ring-red-400",
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
