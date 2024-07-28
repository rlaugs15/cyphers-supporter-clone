import { makeImagePath } from "../../api";
import { cls } from "../../libs/utils";

interface AvatarImgProps {
  id: string;
  character?: boolean;
  item?: boolean;
  cssClass?: string;
}
//추후 4번째 파라미터로 item 추가
function AvatarImg({ id, cssClass, character = true }: AvatarImgProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${character ? makeImagePath(id) : null})`,
      }}
      className={cls("w-16 h-16 bg-blue-200 rounded-full", `${cssClass}`)}
    />
  );
}

export default AvatarImg;
