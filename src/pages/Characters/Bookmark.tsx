import { useRecoilState } from "recoil";
import { contentTitleStyle } from "../../libs/utils";
import { champBookmarkAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../../api";

function Bookmark() {
  const nav = useNavigate();
  const [champBookmark, setChampBookmark] = useRecoilState(champBookmarkAtom);

  const onCharacterInfoClick = (characterId: string, characterName: string) => {
    nav(`${characterName}`, {
      state: {
        characterId,
      },
    });
  };

  const deleteBookmarkClick = () => {
    setChampBookmark([]);
  };
  return (
    <>
      <header className="flex justify-between">
        <span className={`${contentTitleStyle}`}>즐겨찾는 사이퍼</span>
        <button onClick={deleteBookmarkClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </header>
      <main>
        {champBookmark && champBookmark.length > 0 ? (
          <div className="grid grid-cols-12 gap-1">
            {champBookmark.map((champ) => (
              <button
                onClick={() =>
                  onCharacterInfoClick(champ.characterId, champ.characterName)
                }
                key={champ.characterId}
              >
                <figure
                  style={{
                    backgroundImage: `url(${makeImagePath(champ.characterId)})`,
                  }}
                  className="relative flex items-end h-auto bg-black bg-cover aspect-square"
                >
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
                  <figcaption className="w-full text-sm text-white bg-black text-start opacity-60">
                    {champ.characterName}
                  </figcaption>
                </figure>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-slate-500"
            >
              <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
            </svg>
            <span className="font-semibold">즐겨찾는 사이퍼가 없습니다</span>
            <span>
              캐릭터 정보 페이지에서 원하는 캐릭터를 즐겨찾기에 추가해보세요
            </span>
          </div>
        )}
      </main>
    </>
  );
}

export default Bookmark;
