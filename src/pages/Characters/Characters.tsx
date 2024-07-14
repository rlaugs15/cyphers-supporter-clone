import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { ICharacters, getCharacters } from "../../api";
import { useQuery } from "react-query";
import CharacterCard from "./CharacterCard";
import { useSetRecoilState } from "recoil";
import { characterLenthAtom } from "../../atoms";
import CharWindAndPick from "./CharacterInfo/WinAndPick/CharWinAndPick";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

interface IForm {
  character: string;
}

function Characters() {
  const { isLoading: charactersLoading, data: charactersData } =
    useQuery<ICharacters>(["characters"], () => getCharacters(), {
      staleTime: 1000 * 60 * 20,
    });

  const characterLenth = useSetRecoilState(characterLenthAtom);
  useEffect(() => {
    if (charactersData?.rows) {
      characterLenth(charactersData?.rows.length);
    }
  }, [charactersData]);

  const { register, handleSubmit, setValue, watch } = useForm<IForm>();
  const onCaracterSubmit = ({ character }: IForm) => {
    setValue("character", "");
  };

  //캐릭터 실시간 검색
  const characterRealTime = watch("character");
  const charactersRealTimeData = charactersData?.rows?.filter((character) =>
    character.characterName.includes(characterRealTime)
  );

  return (
    <div className="space-y-5">
      {!charactersLoading &&
        charactersData?.rows.map((character) => (
          <CharWindAndPick
            key={character.characterId}
            characterId={character.characterId}
            characterName={character.characterName}
          />
        ))}
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
        <main className="grid grid-cols-12 gap-1">
          {charactersLoading &&
            [...Array.from(Array(72).keys())].map((item) => (
              <Skeleton
                key={item}
                width="100%"
                height={0}
                style={{ paddingBottom: "100%" }}
              />
            ))}
          {!charactersLoading &&
            charactersRealTimeData?.map((character) => (
              <CharacterCard
                key={character?.characterId}
                characterId={character?.characterId}
                characterName={character?.characterName}
              />
            ))}
        </main>
      </div>
      <Outlet />
    </div>
  );
}

export default Characters;