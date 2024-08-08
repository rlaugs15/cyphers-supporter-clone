import { Link } from "react-router-dom";
import { PlayerInfo } from "../../../../api";
import { cls, winningRate } from "../../../../libs/utils";
import PositionImg from "../../../../components/images/PositionImg";
import Skeleton from "react-loading-skeleton";
import AvatarImg from "../../../../components/images/AvatarImg";

interface RecentGameCardProps {
  playerAllMatchLoading: boolean;
  playerMatchData: PlayerInfo;
}

function RecentGameCard({
  playerAllMatchLoading,
  playerMatchData,
}: RecentGameCardProps) {
  return (
    <section className="space-y-1">
      <div className="py-4 text-xl font-semibold">최근 5게임</div>
      <>
        {playerAllMatchLoading &&
          [...Array.from(Array(5).keys())].map((item) => (
            <div
              key={item}
              className="flex items-center justify-start w-full space-x-3 bg-slate-300"
            >
              <Skeleton width={64} height={64} circle />
              <Skeleton width={32} height={32} circle />
              <Skeleton width={24} height={24} circle />
              <figcaption className="flex flex-col">
                <Skeleton width={100} />
                <Skeleton width={80} />
              </figcaption>
            </div>
          ))}
        {!playerAllMatchLoading &&
          playerMatchData?.matches?.rows?.slice(0, 6).map((match) => (
            <Link
              to={`/matches/${match?.matchId}`}
              className={cls(
                "flex items-center justify-start space-x-3 w-full",
                match?.playInfo?.result === "win" ? "bg-blue-200" : "bg-red-200"
              )}
            >
              <AvatarImg character id={match?.playInfo?.characterId} />
              <PositionImg positionName={match?.position?.name} />
              <span>({match?.playInfo?.result === "win" ? "승" : "패"})</span>
              <figcaption className="flex flex-col text-sm text-slate-600">
                <span>
                  {match?.playInfo?.killCount}킬 {match?.playInfo?.deathCount}
                  데스 {match?.playInfo?.assistCount}어시
                </span>
                <span>
                  KDA:{" "}
                  {winningRate(
                    match?.playInfo?.killCount,
                    match?.playInfo?.deathCount,
                    match?.playInfo?.assistCount
                  )}
                  점
                </span>
              </figcaption>
            </Link>
          ))}
      </>
    </section>
  );
}

export default RecentGameCard;
