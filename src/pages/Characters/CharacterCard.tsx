import { useMatch, useNavigate } from "react-router-dom";
import { cls } from "../../libs/utils";
import { makeImagePath } from "../../api";

interface CharacterCardProps {
  characterName: string;
  characterId: string;
}

function CharacterCard({ characterId, characterName }: CharacterCardProps) {
  //캐릭터 이미지 클릭 시 효과 부여
  const match = useMatch("/characters/:characterName");
  const characterNameFocus = match
    ? decodeURIComponent(match.params.characterName + "")
    : null;
  //캐릭터 이미지 클릭 시 Outlet으로 url 이동
  const nav = useNavigate();
  const onCharacterInfoClick = (characterName: string) => {
    nav(`${characterName}`, {
      state: {
        characterId,
      },
    });
  };
  return (
    <button
      onClick={() => onCharacterInfoClick(characterName)}
      className={cls(
        "focus:bg-red-600 focus:p-1 group",
        characterNameFocus === characterName ? "bg-red-600 p-1" : ""
      )}
    >
      <figure
        key={characterId}
        style={{
          backgroundImage: `url(${makeImagePath(characterId)})`,
        }}
        className={cls(
          "flex items-end w-auto bg-black bg-cover aspect-square grayscale-[80%] group-focus:grayscale-0",
          characterNameFocus === characterName ? "grayscale-0" : ""
        )}
      >
        <figcaption className="w-full text-sm text-white bg-black text-start opacity-60">
          {characterName}
        </figcaption>
      </figure>
    </button>
  );
}

export default CharacterCard;
