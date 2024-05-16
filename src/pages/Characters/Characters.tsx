import { useForm } from "react-hook-form";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { ICharacters, getCharacters, makeImagePath } from "../../api";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import { cls } from "../../libs/utils";

interface IForm {
  character: string;
}

function Characters() {
  const { isLoading: charactersLoading, data: charactersData } =
    useQuery<ICharacters>(["characters"], () => getCharacters(), {
      staleTime: 1000 * 60 * 20,
    });
  console.log(charactersData);

  const match = useMatch("/characters/:characterName");
  const characterName = match
    ? decodeURIComponent(match.params.characterName + "")
    : null;

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onCaracterSubmit = ({ character }: IForm) => {
    setValue("character", "");
    console.log(character);
  };
  const nav = useNavigate();
  const onCharacterInfoClick = (characterName: string) => {
    nav(`${characterName}`);
  };
  return (
    <div className="space-y-5">
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <span className="text-2xl mb-7">캐릭터를 선택하세요.</span>
        <nav className="flex justify-end">
          <form
            onSubmit={handleSubmit(onCaracterSubmit)}
            className="relative flex items-center w-64 h-8 border-b-2 border-transparent hover:border-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-6 h-6 mr-1 right-56"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              {...register("character", { required: true })}
              type="text"
              required
              className="w-full h-full border-b border-black outline-none pl-7"
              placeholder="검색할 캐릭터명을 입력하세요."
            />
          </form>
        </nav>
        {charactersLoading ? (
          <Loading />
        ) : (
          <main className="grid grid-cols-12 gap-1">
            {charactersData?.rows.map((character) => (
              <button
                onClick={() => onCharacterInfoClick(character.characterName)}
                className={cls(
                  "focus:bg-red-600 focus:p-1 group",
                  character.characterName === characterName
                    ? "bg-red-600 p-1"
                    : ""
                )}
              >
                <figure
                  key={character.characterId}
                  style={{
                    backgroundImage: `url(${makeImagePath(
                      character.characterId
                    )})`,
                  }}
                  className={cls(
                    "flex items-end w-auto bg-black bg-cover aspect-square grayscale-[80%] group-focus:grayscale-0",
                    character.characterName === characterName
                      ? "grayscale-0"
                      : ""
                  )}
                >
                  <figcaption className="w-full text-sm text-white bg-black text-start opacity-60">
                    {character.characterName}
                  </figcaption>
                </figure>
              </button>
            ))}
          </main>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Characters;
