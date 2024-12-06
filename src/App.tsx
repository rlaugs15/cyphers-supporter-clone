import { Outlet } from "react-router-dom";
import Contents from "./sidePages/Contents";
import Aside from "./sidePages/Aside";
import { useRecoilValue } from "recoil";
import { itemDetailScreenAtom } from "./atoms";
import ItemDetailScreen from "./components/ItemDetailScreen";
import Notice from "./components/Notice";

function App() {
  const itemDetail = useRecoilValue(itemDetailScreenAtom);
  return (
    <div className="flex w-screen h-auto gap-8 p-4 pr-8 bg-slate-100">
      <Contents />
      <div className="w-full drop-shadow-md min-w-[1067px] flex flex-col gap-4">
        <Notice title="공지: 매칭 데이터(일반) 관련 오류">
          사이퍼즈 오픈 API의 매칭 데이터(일반)API 응답 모델이 변경되어 현재
          수정 중입니다.
          <br /> 일부 기능의 이용이 제한될 수 있습니다.
        </Notice>
        <Outlet />
      </div>
      <Aside />
      {itemDetail ? <ItemDetailScreen /> : null}
    </div>
  );
}

export default App;
