import { cls } from "../libs/utils";

interface PositionImgProps {
  positionName: string;
}

function PositionImg({ positionName }: PositionImgProps) {
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
