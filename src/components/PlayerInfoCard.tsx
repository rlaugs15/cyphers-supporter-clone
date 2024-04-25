import { IPlayerInfo } from "../api";
import ImgOrRankAndRate from "./ImgOrRankAndRate";

interface PlayerInfoProps {
  playerInfoData: IPlayerInfo;
}

function PlayerInfoCard({ playerInfoData }: PlayerInfoProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">
          {playerInfoData?.nickname ?? "Unknown"}
        </span>
        <span className="text-sm">{playerInfoData?.clanName ?? "Unknown"}</span>
        <span className="mt-2 text-slate-400">
          {playerInfoData?.grade ?? "0"}
        </span>
      </div>
      <article className="grid grid-cols-2">
        <ImgOrRankAndRate playerInfoData={playerInfoData!} />
        <ImgOrRankAndRate playerInfoData={playerInfoData!} normal />
      </article>
    </>
  );
}

export default PlayerInfoCard;
