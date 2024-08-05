import { Outlet } from "react-router-dom";

function Board() {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}

export default Board;
