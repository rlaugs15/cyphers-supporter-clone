import { useQuery } from "react-query";
import { DetailMatchData, getDetailMatching } from "../../../../api";
import { useParams } from "react-router-dom";
import MatchsReport from "./MatchsReport";
import GameViewDetail from "./GameViewDeatil";

function Matches() {
  const { matchId } = useParams();

  const { isLoading: detailMatchingLoading, data: detailMatchingData } =
    useQuery<DetailMatchData>(["detailNatcing", matchId], () =>
      getDetailMatching(matchId + "")
    );

  return (
    <>
      {detailMatchingLoading ? (
        <span className="text-3xl font-semibold">로딩 중...</span>
      ) : (
        <div className="space-y-9">
          <GameViewDetail detailMatchingData={detailMatchingData!} />
          <MatchsReport detailMatchingData={detailMatchingData!} />
        </div>
      )}
    </>
  );
}

export default Matches;
