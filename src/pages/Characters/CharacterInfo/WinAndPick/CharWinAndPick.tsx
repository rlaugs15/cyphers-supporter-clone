import { useSetRecoilState } from "recoil";
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
  const setCharWindAndPick = useSetRecoilState(charWindAndPickAtom);
  useEffect(() => {
    if (!charactersLoading && charactersData) {
      let winRateList: number[] = [];
      let winRate = 0;
      let pickRate = 0;
      for (const character of charactersData.rows) {
        winRateList = [...winRateList, character.winRate];
      }
      winRate = calculateAverage(winRateList);
      pickRate = charactersData.rows.length;
      setCharWindAndPick((prev) => [
        ...prev,
        { characterId, characterName, winRate, pickRate },
      ]);
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
