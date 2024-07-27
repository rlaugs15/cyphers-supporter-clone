import Skeleton from "react-loading-skeleton";
import { CharacterRanking } from "../../../../api";
import { contentBoxStyle, convertRank } from "../../../../libs/utils";
import { useRecoilValue } from "recoil";
import { characterLenthAtom, charWindAndPickAtom } from "../../../../atoms";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface WinAndPickSectionProps {
  characterId: string;
  loading: boolean;
  characterRankData?: CharacterRanking;
}

function WinAndPickSection({
  loading,
  characterRankData,
}: WinAndPickSectionProps) {
  const { characterName } = useParams();
  //픽 순위 출력
  const [pickNum, setPickNum] = useState(0);
  const [WinNum, setWinNum] = useState(0);
  const totalChamp = useRecoilValue(characterLenthAtom);
  const charWindAndPick = useRecoilValue(charWindAndPickAtom);
  console.log(charWindAndPick.slice(1));

  //승률 생성
  useEffect(() => {
    //charWindAndPick의 0번과 1번 인덱스만 중복되므로 0번을 제외하고 반환
    let newCharWindAndPick = charWindAndPick.slice(1);
    const winRankIndex = newCharWindAndPick
      .sort((a, b) => Number(b.winRate) - Number(a.winRate))
      .findIndex((item) => item.characterName === characterName);
    setWinNum(winRankIndex + 1);
  }, [charWindAndPick, setWinNum, characterName]);

  //픽률 생성
  useEffect(() => {
    let newCharWindAndPick = charWindAndPick.slice(1);
    const pickRankIndex = newCharWindAndPick
      .sort((a, b) => Number(b.pickRate) - Number(a.pickRate))
      .findIndex((item) => item.characterName === characterName);
    setPickNum(pickRankIndex + 1);
  }, [charWindAndPick, setPickNum, characterName]);

  let winAndPickLoading =
    loading || !totalChamp || !pickNum || !WinNum || !characterRankData;

  return (
    <>
      <header className="p-3 bg-white">
        <div className="flex justify-start">
          <span className="text-2xl">승률/픽률 통계</span>
        </div>
      </header>
      <section className={`grid grid-cols-2 gap-9 ${contentBoxStyle}`}>
        <div className="flex flex-col">
          {winAndPickLoading ? (
            <>
              <Skeleton width={120} />
              <Skeleton width={"100%"} />
              <p className="flex justify-end">
                <Skeleton width={80} />
              </p>
            </>
          ) : (
            <>
              <span>
                승률: {WinNum}위 ({WinNum}/{totalChamp})
              </span>
              <meter
                min="0"
                max="100"
                value={convertRank(WinNum, totalChamp)}
                className="w-full h-6"
              />
              <p className="flex justify-end">
                <span>{convertRank(WinNum, totalChamp)}%</span>
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col">
          {winAndPickLoading ? (
            <>
              <Skeleton width={120} />
              <Skeleton width={"100%"} />
              <p className="flex justify-end">
                <Skeleton width={80} />
              </p>
            </>
          ) : (
            <>
              <span>
                픽률 {pickNum}위 ({pickNum}/{totalChamp})
              </span>
              <meter
                min="0"
                max="100"
                value={convertRank(pickNum, totalChamp)}
                className="w-full h-6"
              />
              <p className="flex justify-end">
                <span>{convertRank(pickNum, totalChamp)}%</span>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default WinAndPickSection;
