import { Outlet } from "react-router-dom";
import Contents from "./sidePages/Contents";
import Aside from "./sidePages/Aside";

function App() {
  return (
    <div className="flex w-screen h-screen gap-8 p-4 bg-slate-100">
      <Contents />
      <div className="w-full drop-shadow-md min-w-[1067px]">
        <Outlet />
      </div>
      <Aside />
    </div>
  );
}

export default App;
