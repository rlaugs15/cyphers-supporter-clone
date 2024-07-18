import { makeImagePath } from "../api";

interface AvatarImgProps {
  id: string;
  character?: boolean;
  item?: boolean;
}
//추후 2번째 파라미터로 item 추가
function AvatarImg({ id, character = true }: AvatarImgProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${character ? makeImagePath(id) : null})`,
      }}
      className="w-16 h-16 bg-blue-200 rounded-full"
    />
  );
}

export default AvatarImg;
