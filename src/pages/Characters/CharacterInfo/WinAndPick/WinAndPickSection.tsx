import Skeleton from "react-loading-skeleton";
import { CharacterRanking } from "../../../../api";
import { contentBoxStyle } from "../../../../libs/utils";
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
  const characterLenth = useRecoilValue(characterLenthAtom);
  const charWindAndPick = useRecoilValue(charWindAndPickAtom);
  //승률 생성
  useEffect(() => {
    let newCharWindAndPick = [...charWindAndPick];
    const winRankIndex = newCharWindAndPick
      .sort((a, b) => Number(a.winRate) - Number(b.winRate))
      .findIndex((item) => item.characterName === characterName);
    setWinNum(winRankIndex);
  }, [charWindAndPick, setWinNum, characterName]);

  //픽률 생성
  useEffect(() => {
    let newCharWindAndPick = [...charWindAndPick];
    const pickRankIndex = newCharWindAndPick
      .sort((a, b) => Number(a.pickRate) - Number(b.pickRate))
      .findIndex((item) => item.characterName === characterName);
    setPickNum(pickRankIndex);
  }, [charWindAndPick, setPickNum, characterName]);

  let winAndPickLoading =
    loading || !characterLenth || !pickNum || !WinNum || !characterRankData;

  //캐릭터를 플레이 한 유저들을 승률 평균 계산
  const calcWinRate = (characterRankData: CharacterRanking) => {
    let winRates: number[] = [];

    for (const characterRanker of characterRankData?.rows) {
      winRates = [...winRates, characterRanker?.winRate];
    }

    // 배열의 합을 구하기
    const total = winRates.reduce((a, b) => a + b, 0);

    // 평균을 구하기
    const average = total / winRates.length;

    return average.toFixed(2);
  };
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
                승률: {WinNum + 1}위 ({WinNum + 1}/{characterLenth})
              </span>
              <meter
                min="0"
                max="100"
                value={calcWinRate(characterRankData!)}
                className="w-full h-6"
              />
              <p className="flex justify-end">
                <span>{calcWinRate(characterRankData!)}%</span>
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
                픽률 {pickNum + 1}위 ({pickNum + 1}/{characterLenth})
              </span>
              <meter
                min="0"
                max="100"
                value={pickNum + 1}
                className="w-full h-6"
              />
              <p className="flex justify-end">
                <span>{pickNum + 1}%</span>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default WinAndPickSection;
