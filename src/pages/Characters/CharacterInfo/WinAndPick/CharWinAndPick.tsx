import { useRecoilState } from "recoil";
import { charWindAndPickAtom } from "../../../../atoms";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { CharacterRanking, getCharacterRanking } from "../../../../api";
import { calculateAverage } from "../../../../libs/utils";

interface CharWindAndPickProps {
  characterId: string;
  characterName: string;
}

function CharWindAndPick({ characterId, characterName }: CharWindAndPickProps) {
  const { isLoading: charactersLoading, data: charactersData } =
    useQuery<CharacterRanking>(
      ["characterRanking", characterId],
      () => getCharacterRanking(characterId + "", "winRate"),
      {
        staleTime: 1000 * 60 * 20,
      }
    );
  const [charWindAndPick, setCharWindAndPick] =
    useRecoilState(charWindAndPickAtom);
  useEffect(() => {
    if (!charactersLoading && charactersData) {
      // setwinRateList 함수 정의
      const setwinRateList = (charactersData: CharacterRanking) => {
        return charactersData.rows.map((character) => character.winRate);
      };

      // calculateAverage 함수 호출하여 winRate 계산
      const winRate = calculateAverage(charactersData, setwinRateList);
      const pickRate = charactersData.rows.length;
      // 중복 체크
      const isDuplicate = charWindAndPick.some(
        (character) => character.characterId === characterId
      );
      // 중복인 아닌 경우에만 업데이트
      if (!isDuplicate) {
        setCharWindAndPick((prev) => [
          ...prev,
          { characterId, characterName, winRate, pickRate },
        ]);
      }
    }
  }, [
    charactersLoading,
    charactersData,
    characterId,
    characterName,
    setCharWindAndPick,
  ]);

  return null;
}

export default CharWindAndPick;
