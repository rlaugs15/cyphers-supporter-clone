import { PlayerInfo } from "../../../../api";
import AvatarImg from "../../../../components/AvatarImg";
import { cls, winningRate } from "../../../../libs/utils";

interface RecentGameCardProps {
  playerMatchData: PlayerInfo;
}

function RecentGameCard({ playerMatchData }: RecentGameCardProps) {
  const playPosition = (position: string) => {
    if (position === "원거리딜러") {
      return { positionName: "원", positionColor: "bg-purple-500" };
    } else if (position === "근거리딜러") {
      return { positionName: "근", positionColor: "bg-red-500" };
    } else if (position === "탱커") {
      return { positionName: "탱", positionColor: "bg-blue-500" };
    } else if (position === "서포터") {
      return { positionName: "폿", positionColor: "bg-yellow-300" };
    }
  };
  return (
    <section className="space-y-1">
      <div className="py-4 text-xl font-semibold">최근 5게임</div>
      {playerMatchData?.matches?.rows?.slice(0, 6).map((match) => (
        <article
          className={cls(
            "flex items-center justify-start space-x-3",
            match?.playInfo?.result === "win" ? "bg-blue-200" : "bg-red-200"
          )}
        >
          <AvatarImg id={match?.playInfo?.characterId} />
          <div
            className={cls(
              "flex items-center justify-center w-8 h-8 text-center rounded-full",
              playPosition(match?.position?.name)?.positionColor + ""
            )}
          >
            <span>{playPosition(match?.position?.name)?.positionName}</span>
          </div>
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
        </article>
      ))}
    </section>
  );
}

export default RecentGameCard;
