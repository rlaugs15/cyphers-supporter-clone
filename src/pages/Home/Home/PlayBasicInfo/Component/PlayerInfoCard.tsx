import Skeleton from "react-loading-skeleton";
import ImgOrRankAndRate from "./ImgOrRankAndRate";
import { IPlayerInfo } from "../../../../../api/cyphersApi";

interface PlayerInfoProps {
  loading: boolean;
  playerInfoData: IPlayerInfo;
}

function PlayerInfoCard({ loading, playerInfoData }: PlayerInfoProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">
          {loading ? (
            <Skeleton width={200} height={"100%"} />
          ) : (
            playerInfoData?.nickname ?? "Unknown"
          )}
        </span>
        <span className="text-sm">
          {loading ? (
            <Skeleton width={100} />
          ) : (
            playerInfoData?.clanName ?? "Unknown"
          )}
        </span>
        <span className="mt-2 text-slate-400">
          {loading ? <Skeleton width={40} /> : playerInfoData?.grade ?? "0"}
        </span>
      </div>
      <article className="grid grid-cols-2">
        {loading ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <Skeleton width={50} />
              <Skeleton width={"64px"} circle height={"64px"} />
              <Skeleton width={100} />
              <Skeleton width={30} />
              <Skeleton width={70} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Skeleton width={50} />
              <Skeleton width={"64px"} circle height={"64px"} />
              <Skeleton width={100} />
              <Skeleton width={30} />
              <Skeleton width={70} />
            </div>
          </>
        ) : (
          <>
            <ImgOrRankAndRate playerInfoData={playerInfoData!} />
            <ImgOrRankAndRate playerInfoData={playerInfoData!} normal />
          </>
        )}
      </article>
    </>
  );
}

export default PlayerInfoCard;
