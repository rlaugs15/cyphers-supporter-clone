import { Outlet } from "react-router-dom";
import Contents from "./sidePages/Contents";
import Aside from "./sidePages/Aside";
import { useRecoilValue } from "recoil";
import { itemDetailScreenAtom } from "./atoms";
import ItemDetailScreen from "./components/ItemDetailScreen";

function App() {
  const itemDetail = useRecoilValue(itemDetailScreenAtom);
  return (
    <div className="flex w-screen h-auto gap-8 p-4 bg-slate-100">
      <Contents />
      <div className="w-full drop-shadow-md min-w-[1067px]">
        <Outlet />
      </div>
      <Aside />
      {itemDetail ? <ItemDetailScreen /> : null}
    </div>
  );
}

export default App;
