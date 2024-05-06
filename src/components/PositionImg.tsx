import { cls, playPosition } from "../libs/utils";

interface PositionImgProps {
  positionName: string;
}

function PositionImg({ positionName }: PositionImgProps) {
  return (
    <div
      className={cls(
        "flex items-center justify-center w-8 h-8 text-center rounded-full",
        playPosition(positionName)?.positionColor + ""
      )}
    >
      <span>{playPosition(positionName)?.positionName}</span>
    </div>
  );
}

export default PositionImg;
