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
  character = false,
  userAvatar = false,
  size = "16",
}: AvatarImgProps) {
  const sizeTransform = (sizeValue: string) => `w-${sizeValue} h-${sizeValue}`;
  const setStyleImage = (
    character: boolean,
    userAvatar: boolean,
    id: string
  ) => {
    if (character) {
      return {
        backgroundImage: `url(${makeImagePath(id)})`,
      };
    } else if (userAvatar) {
      return {
        backgroundImage: `유저 아바타`,
      };
    }
    return {};
  };
  const styleImage = setStyleImage(character, userAvatar, id);
  return (
    <div
      style={{
        ...styleImage,
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
