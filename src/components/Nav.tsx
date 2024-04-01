import { ReactNode } from "react";

interface NavProps {
  svg: ReactNode;
  text: string;
  onClick?: () => void;
}

function Nav({ svg, text, onClick }: NavProps) {
  return (
    <div onClick={onClick} className="flex space-x-2 p-2 hover:bg-slate-200">
      {svg}
      <span>{text}</span>
    </div>
  );
}

export default Nav;
