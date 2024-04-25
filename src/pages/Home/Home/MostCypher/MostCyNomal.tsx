import { useRecoilValue } from "recoil";
import {
  normalMatchingAtom,
  normalMatshingLoadingAtom,
} from "../../../../atoms";
import MostChampBox from "../../../../components/MostChampBox";

function MostCyNomal() {
  const matshingData = useRecoilValue(normalMatchingAtom);
  const matchingLoading = useRecoilValue(normalMatshingLoadingAtom);

  return (
    <MostChampBox
      category="일반"
      matshingData={matshingData!}
      matshingLoading={matchingLoading}
    />
  );
}

export default MostCyNomal;
