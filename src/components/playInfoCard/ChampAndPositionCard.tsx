import { makeImagePath } from "../../api";
import { cls, playPosition } from "../../libs/utils";

interface ChampAndPositionCardProps {
  matchResult: string;
  characterId: string;
  positionName: string;
}

function ChampAndPositionCard({
  matchResult,
  characterId,
  positionName,
}: ChampAndPositionCardProps) {
  return (
    <figure
      className={cls(
        "relative flex p-1 rounded-xl",
        matchResult === "win" ? "bg-blue-400" : "bg-red-400"
      )}
    >
      <div
        style={{
          backgroundImage: `url(${makeImagePath(characterId)})`,
        }}
        className="bg-cover w-14 h-14 bg-slate-400 rounded-xl"
      />
      <span
        className={cls(
          "absolute bottom-11 right-11 rounded-md px-1 font-semibold",
          playPosition(positionName)?.positionColor + ""
        )}
      >
        {playPosition(positionName)?.positionName}
      </span>
    </figure>
  );
}

export default ChampAndPositionCard;
