import { useMatch, useNavigate } from "react-router-dom";
import { cls } from "../../libs/utils";
import { makeImagePath } from "../../api";
import { useRecoilValue } from "recoil";
import { champBookmarkAtom } from "../../atoms";

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

  const bookmarks = useRecoilValue(champBookmarkAtom);
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
          "flex items-end w-auto bg-black bg-cover aspect-square grayscale-[80%] group-focus:grayscale-0 relative",
          characterNameFocus === characterName ? "grayscale-0" : ""
        )}
      >
        {bookmarks?.find((champ) => champ.characterId === characterId) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="yellow"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="none"
            className="absolute top-0 left-0 size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ) : null}

        <figcaption className="w-full text-sm text-white bg-black text-start opacity-60">
          {characterName}
        </figcaption>
      </figure>
    </button>
  );
}

export default CharacterCard;
