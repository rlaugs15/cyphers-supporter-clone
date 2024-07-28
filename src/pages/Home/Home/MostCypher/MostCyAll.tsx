import { useRecoilValue } from "recoil";
import { allMatchingAtom, allMatshingLoadingAtom } from "../../../../atoms";
import { PlayerInfo } from "../../../../api";
import MostChampBox from "./Componet/MostChampBox";

function MostCyAll() {
  const combinedData = useRecoilValue(allMatchingAtom);
  const allLoading = useRecoilValue(allMatshingLoadingAtom);
  return (
    <MostChampBox
      category="전체"
      matshingData={combinedData as PlayerInfo}
      matshingLoading={allLoading}
    />
  );
}

export default MostCyAll;
