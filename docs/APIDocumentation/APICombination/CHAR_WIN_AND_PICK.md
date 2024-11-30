# 캐릭터 정보조회 페이지(승률 / 픽률 통계 계산)

<img width="638" alt="image" src="https://github.com/user-attachments/assets/b08c8741-db11-44fd-9b0a-ada6b858895e">

React Query와 Recoil을 사용하여 캐릭터의 전체 승률과 픽률을 계산하고 순위를 출력하는 방법을 설명한다. 이 방법은 API를 활용하여 데이터를 가져오고 수정하여, 이를 컴포넌트에 반영하는 과정을 포함한다.

**React Query의 staleTime 옵션을 20분으로 설정하여 캐시 업데이트에 따른 로딩과 그에 따라 잦은 계산으로 인한 과부하가 일어나지 않도록 조정**

## API 구성

먼저 두 개의 API를 사용하여 캐릭터와 해당 캐릭터의 랭킹 정보를 가져온다.

**1번 API: 캐릭터 정보 조회**

```javascript
interface Character {
  characterId: string;
  characterName: string;
}

export interface ICharacters {
  rows: Character[];
}

// 캐릭터 정보를 조회하는 함수
export async function getCharacters() {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/characters?apikey=${API_KEY}`
  );
  return response.data;
}
```

**2번 API: 캐릭터 랭킹 조회**
1번 API의 characterId가 필요

```javascript
export interface CharacterRanker {
  rank: number;
  beforeRank: number;
  playerId: string;
  nickname: string;
  grade: number;
  winCount: number;
  loseCount: number;
  winRate: number;
  clanName: string;
}

export interface CharacterRanking {
  rows: CharacterRanker[];
}

// 캐릭터 랭킹 정보를 조회하는 함수
export async function getCharacterRanking(
  characterId: string,
  rankingType: "winRate",
  limit: string = "1000"
) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/ranking/characters/${characterId}/${rankingType}?limit=${limit}&apikey=${API_KEY}`
  );
  return response.data;
}
```

## Recoil Atom 설정

캐릭터의 승률과 픽률 데이터를 전역 상태로 관리하기 위해 Recoil의 Atom을 설정한다.

```javascript
import { atom } from "recoil";

// 캐릭터의 승률과 픽률 정보를 담는 인터페이스
//최종적으로 원하는 데이터의 모양
export interface IWinAndPickStat {
  characterId: string;
  characterName: string;
  winRate?: number;
  pickRate?: number;
}

// Recoil Atom 설정
export const charWindAndPickAtom = atom<IWinAndPickStat[]>({
  key: "charWindAndPick",
  default: [],
});
```

## 컴포넌트 간 데이터 변환 요약

- **Characters 컴포넌트:** 캐릭터 목록을 가져와 CharWindAndPick 컴포넌트를 통해 승률과 픽률 데이터를 관리
- **CharWindAndPick 컴포넌트:** 각 캐릭터의 승률과 픽률을 계산하여 Recoil Atom에 저장
- **WinAndPickSection 컴포넌트:** 각 캐릭터의 승률과 픽률을 계산하여 UI에 표시

## 계산 과정

**Characters 컴포넌트**
캐릭터 목록을 가져오고, 각 캐릭터에 대한 추가 정보를 CharWindAndPick 컴포넌트를 통해 관리한다.

```javascript
interface IForm {
  character: string;
}

function Characters() {
  // 캐릭터 목록을 가져오는 쿼리
  const { isLoading, data } = useQuery<ICharacters>(["characters"], getCharacters);

  // 캐릭터 총 인구수를 설정하는 Recoil 상태 설정 함수
  const setCharacterLength = useSetRecoilState(characterLenthAtom);
  useEffect(() => {
    if (data?.rows) {
      setCharacterLength(data.rows.length);
    }
  }, [data, setCharacterLength]);

  const { register, handleSubmit, watch } = useForm<IForm>();
  const characterRealTime = watch("character");
  const charactersRealTimeData = data?.rows.filter((character) =>
    character.characterName.includes(characterRealTime)
  );

  return (
    <div className="space-y-5">
      {/* 각 캐릭터에 대해 CharWindAndPick 컴포넌트를 렌더링 */}
      {!isLoading &&
        data?.rows.map((character) => (
          <CharWindAndPick key={character.characterId} characterId={character.characterId} characterName={character.characterName} />
        ))}
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <span className="text-2xl mb-7">캐릭터를 선택하세요.</span>
        <nav className="flex justify-end">
          <form onSubmit={handleSubmit(() => {})} className="relative flex items-center w-64 h-8 border-b-2 border-transparent hover:border-black">
            <input {...register("character", { required: true })} type="text" required className="w-full h-full border-b border-black outline-none pl-7" placeholder="검색할 캐릭터명을 입력하세요." />
          </form>
        </nav>
        {isLoading ? <Loading /> : (
          <main className="grid grid-cols-12 gap-1">
            {/* 검색된 캐릭터 목록을 렌더링 */}
            {charactersRealTimeData?.map((character) => (
              <CharacterCard key={character.characterId} characterId={character.characterId} characterName={character.characterName} />
            ))}
          </main>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Characters;
```

**CharWindAndPick 컴포넌트**
각 캐릭터의 승률과 픽률을 계산하여 Recoil Atom에 저장한다.

```javascript
interface CharWindAndPickProps {
  characterId: string;
  characterName: string;
}

function CharWindAndPick({ characterId, characterName }: CharWindAndPickProps) {
  // 캐릭터 랭킹 정보를 가져오는 쿼리
  const { isLoading: charactersLoading, data: charactersData } =
    useQuery <
    CharacterRanking >
    (["characterRanking", characterId],
    () => getCharacterRanking(characterId + "", "winRate"),
    {
      staleTime: 1000 * 60 * 20,
    });

  // Recoil 상태 설정 함수
  const setCharWindAndPick = useSetRecoilState(charWindAndPickAtom);

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
```

**WinAndPickSection 컴포넌트**
각 캐릭터의 승률과 픽률을 계산하여 UI에 표시한다.

```javascript
interface WinAndPickSectionProps {
  characterId: string;
  loading: boolean;
  characterRankData?: CharacterRanking;
}

function WinAndPickSection() {
  const { characterName } = useParams();
  const [pickNum, setPickNum] = useState(0);
  const [winNum, setWinNum] = useState(0);
  //총 인구수
  const totalChamp = useRecoilValue(characterLenthAtom);
  //캐릭터의 픽률과 승률이 계산된 새로운 배열
  const charWindAndPick = useRecoilValue(charWindAndPickAtom);

  //캐릭터의 승률 순위를 계산
  useEffect(() => {
    //charWindAndPick의 0번과 1번 인덱스만 중복되므로 0번을 제외하고 반환
    let newCharWindAndPick = charWindAndPick.slice(1);
    const winRankIndex = newCharWindAndPick
      .sort((a, b) => Number(b.winRate) - Number(a.winRate))
      .findIndex((item) => item.characterName === characterName);
    setWinNum(winRankIndex + 1);
  }, [charWindAndPick, setWinNum, characterName]);

  //캐릭터의 픽률 순위를 계산
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
    <div>
      <header>
        <span>{characterName}의 정보</span>
      </header>
      //...나머지 코드
      <span>
        승률: {WinNum}위 ({WinNum}/{totalChamp})
      </span>
      <meter
        min="0"
        max="100"
        value={convertRank(WinNum, totalChamp)} //비례 변환 함수
        className="w-full h-6"
      />
      <p className="flex justify-end">
        <span>{convertRank(WinNum, totalChamp)}%</span>
      </p>
      //...나머지 코드
    </div>
  );
}

export default WinAndPickSection;
```

이제 WinAndPickSection 컴포넌트는 charWindAndPickAtom에서 데이터를 가져와 승률과 픽률을 계산하고, 이를 통해 현재 캐릭터의 순위를 표시할 수 있다.
