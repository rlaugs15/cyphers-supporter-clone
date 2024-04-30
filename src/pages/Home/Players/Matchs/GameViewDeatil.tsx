import { DetailMatchData } from "../../../../api";

interface IGameViewDetail {
  detailMatchingData: DetailMatchData;
}

function GameViewDetail({ detailMatchingData }: IGameViewDetail) {
  const changeMinuteAndSecond = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };
  return (
    <header className="p-4 space-y-10 bg-white">
      <span className="text-2xl">경기 상세보기</span>
      <div className="flex flex-col">
        <span>
          게임타입:{" "}
          {detailMatchingData?.map?.mapId === "normal" ? "일반" : "공식"}
        </span>
        <span>시작일자: {detailMatchingData?.date}</span>
        <span>
          플레이타임:{" "}
          {changeMinuteAndSecond(
            Number(detailMatchingData?.players[0]?.playInfo?.playTime)
          )}
        </span>
        <span>맵: {detailMatchingData?.map?.name}</span>
      </div>
    </header>
  );
}

export default GameViewDetail;
