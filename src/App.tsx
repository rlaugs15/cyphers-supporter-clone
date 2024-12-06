import { Outlet } from "react-router-dom";
import Contents from "./sidePages/Contents";
import Aside from "./sidePages/Aside/Aside";
import { useRecoilValue } from "recoil";
import { itemDetailScreenAtom } from "./atoms";
import ItemDetailScreen from "./components/ItemDetailScreen";

function App() {
  const itemDetail = useRecoilValue(itemDetailScreenAtom);
  return (
    <div className="flex w-screen gap-8 p-4 pr-8">
      <Contents />
      <div className="w-full drop-shadow-md min-w-[1067px] flex flex-col gap-4">
        <Outlet />
      </div>
      <Aside />
      {itemDetail ? <ItemDetailScreen /> : null}
    </div>
  );
}

export default App;
