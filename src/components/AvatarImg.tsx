import { makeImagePath } from "../libs/utils";

interface AvatarImgProps {
  id: string;
  character?: boolean;
  item?: boolean;
}

function AvatarImg({ id, character = true, item }: AvatarImgProps) {
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
