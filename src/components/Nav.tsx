import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface NavProps {
  svg: ReactNode;
  text: string;
  movePage: string;
}

function Nav({ svg, movePage, text }: NavProps) {
  const nav = useNavigate();
  const onClickMove = () => {
    nav(`${movePage}`);
  };
  return (
    <button
      onClick={onClickMove}
      className="flex w-full p-2 space-x-2 hover:bg-slate-200"
    >
      {svg}
      <span>{text}</span>
    </button>
  );
}

export default Nav;
