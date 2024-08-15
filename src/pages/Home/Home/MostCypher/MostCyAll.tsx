import { useRecoilValue } from "recoil";
import { allMatchingAtom, allMatshingLoadingAtom } from "../../../../atoms";
import MostChampBox from "./Componet/MostChampBox";
import { PlayerInfo } from "../../../../api/cyphersApi";

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
