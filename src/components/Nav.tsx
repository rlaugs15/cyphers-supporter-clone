import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { cls } from "../libs/utils";

interface NavProps {
  svg: ReactNode;
  text: string;
  movePage?: string; //모든 페이지 작업이 끝나면 ? 제거
  disabled?: boolean;
}

function Nav({ svg, movePage, text, disabled = false }: NavProps) {
  const nav = useNavigate();
  const onClickMove = () => {
    nav(`${movePage}`);
  };
  return (
    <button
      onClick={onClickMove}
      className={cls(
        "flex w-full p-2 space-x-2 hover:bg-slate-200",
        disabled ? "text-slate-400" : ""
      )}
      disabled={!!disabled}
    >
      {svg}
      <span>{text}</span>
    </button>
  );
}

export default Nav;
