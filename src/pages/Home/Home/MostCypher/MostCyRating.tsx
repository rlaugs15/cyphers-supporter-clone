import { useRecoilValue } from "recoil";
import {
  ratingMatchingAtom,
  ratingMatshingLoadingAtom,
} from "../../../../atoms";
import MostChampBox from "./Componet/MostChampBox";

function MostCyRating() {
  const matshingData = useRecoilValue(ratingMatchingAtom);
  const matchingLoading = useRecoilValue(ratingMatshingLoadingAtom);
  return (
    <MostChampBox
      category="공식"
      matshingData={matshingData!}
      matshingLoading={matchingLoading}
    />
  );
}

export default MostCyRating;
