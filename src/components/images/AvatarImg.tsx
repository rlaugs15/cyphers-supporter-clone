import { makeImagePath } from "../../api";
import { cls } from "../../libs/utils";

interface AvatarImgProps {
  id: string;
  character?: boolean;
  userAvatar?: boolean;
  item?: boolean;
  cssClass?: string;
  size?: string;
}
//추후 4번째 파라미터로 item 추가
function AvatarImg({
  id,
  cssClass,
  character = true,
  userAvatar = false,
  size = "16",
}: AvatarImgProps) {
  const sizeTransform = (sizeValue: string) => `w-${sizeValue} h-${sizeValue}`;
  return (
    <div
      style={{
        backgroundImage: `url(${
          character && !userAvatar
            ? makeImagePath(id)
            : userAvatar
            ? "유저 아바타"
            : null
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={cls(
        "bg-slate-300 rounded-full",
        `${cssClass}, ${sizeTransform(size)}`
      )}
    />
  );
}

export default AvatarImg;
