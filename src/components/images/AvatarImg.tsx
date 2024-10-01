import { makeImagePath } from "../../api/cyphersApi";
import { defaultAvatarImgUrl } from "../../libs/userUtils";
import { cls } from "../../libs/utils";

interface AvatarImgProps {
  id?: string;
  character?: boolean;
  userAvatar?: boolean;
  userAvatarUrl?: string;
  item?: boolean;
  cssClass?: string;
  size?: string;
}
//추후 4번째 파라미터로 item 추가
function AvatarImg({
  id = "",
  cssClass,
  character = false,
  userAvatar = false,
  userAvatarUrl,
  size = "16",
}: AvatarImgProps) {
  const sizeTransform = (sizeValue: string) => `w-${sizeValue} h-${sizeValue}`;
  const setStyleImage = (
    character: boolean,
    id: string,
    userAvatar: boolean,
    userAvatarUrl?: string
  ) => {
    if (character) {
      return {
        backgroundImage: `url(${makeImagePath(id)})`,
      };
    } else if (userAvatar) {
      let url = "";
      if (userAvatarUrl) {
        url = userAvatarUrl;
      } else {
        url = defaultAvatarImgUrl;
      }
      return {
        backgroundImage: `url(${url})`,
      };
    }
  };

  const styleImage = setStyleImage(character, id, userAvatar, userAvatarUrl);

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
