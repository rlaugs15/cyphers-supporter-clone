import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { CharacterRanking, getCharacterRanking } from "../../../api";
import { baseBoxStyle, meterStylesBlack } from "../../../libs/utils";
import PositionStats from "./PositionStats";
import ItemCard from "../../../components/playInfoCard/ItemCard";
import Skeleton from "react-loading-skeleton";
import WinAndPickSection from "./WinAndPick/WinAndPickSection";

function CharacterInfo() {
  const { characterName } = useParams();

  const {
    state: { characterId },
  } = useLocation();

  const { isLoading: characterRankLoading, data: characterRankData } =
    useQuery<CharacterRanking>(["characterRanking", characterId], () =>
      getCharacterRanking(characterId + "", "winRate")
    );

  return (
    <>
      <style>{meterStylesBlack}</style>
      <header className="flex justify-between w-full p-3 text-2xl bg-white drop-shadow-md">
        {characterName ? (
          <span>{characterName}의 정보</span>
        ) : (
          <Skeleton width={160} />
        )}
        <figure className="flex items-center space-x-2">
          <button className="relative p-3 transition rounded-full hover:bg-slate-200 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 aspect-square text-slate-500"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <figcaption className="absolute left-0 right-0 flex justify-center w-auto transition opacity-0 top-16 group-hover:opacity-100">
              <span
                style={{ whiteSpace: "nowrap" }}
                className="p-1 text-xs text-white rounded-sm bg-slate-600"
              >
                {characterName} 포스터
              </span>
            </figcaption>
          </button>
          <button className="relative p-3 transition rounded-full hover:bg-slate-200 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 aspect-square text-slate-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <figcaption className="absolute left-0 right-0 flex justify-center w-auto transition opacity-0 top-16 group-hover:opacity-100">
              <span
                style={{ whiteSpace: "nowrap" }}
                className="p-1 text-xs text-white rounded-sm bg-slate-600"
              >
                즐겨찾기에 추가
              </span>
            </figcaption>
          </button>
        </figure>
      </header>
      <section>
        <WinAndPickSection
          characterId={characterId}
          loading={characterRankLoading}
          characterRankData={characterRankData}
        />
      </section>
      <PositionStats />
      {/*아이템파트*/}
      <div className={`${baseBoxStyle}`}>
        <header className="flex justify-start p-3 bg-white">
          <div className="flex justify-start">
            <span className="text-2xl">추천 아이템</span>
          </div>
        </header>
        <section className="flex justify-center w-full">
          <section className="grid grid-cols-8 gap-3">
            {[...Array.from(Array(16).keys())].map((num) => (
              <ItemCard
                key={num}
                itemId="1"
                itemName="장갑"
                rarityName="유니크"
              />
            ))}
          </section>
        </section>
      </div>
    </>
  );
}

export default CharacterInfo;
