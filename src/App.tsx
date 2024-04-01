import { Outlet } from "react-router-dom";
import Contents from "./sidePages/Contents";
import Aside from "./sidePages/Aside";

function App() {
  return (
    <div className="flex w-screen h-screen gap-8 bg-slate-100 p-4">
      <Contents />
      <div className="w-full drop-shadow-md">
        <Outlet />
      </div>
      <Aside />
    </div>
  );
}

export default App;
