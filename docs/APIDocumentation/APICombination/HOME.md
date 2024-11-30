# 메인 페이지 모스트 사이퍼

![image](https://github.com/user-attachments/assets/4ee2624e-933c-4201-9a61-5eb978a17109)

## 데이터 흐름 다이어그램

```css
1번 API (getPlayer)  → 2번 API (getPlayerInfo) → 3번 API (getMatching)
      ↓                         ↓                        ↓
플레이어 기본 정보 조회   플레이어 상세 정보 조회    매칭 정보 조회
```

## 컴포넌트 간 데이터 변환 요약

- **Home 컴포넌트:** 검색된 닉네임을 저장하고 PlayerBasicInfo로 이동
- **PlayerBasicInfo 컴포넌트:** 플레이어 정보와 매칭 데이터를 Recoil 상태로 관리
- **PlayerInfoCard 컴포넌트:** PlayerBasicInfo에서 가져온 플레이어 기본 정보를 화면에 표시
- **MostChampBox 컴포넌트:** 매칭 데이터를 기반으로 UI 구성

## API 구성

**1번 API: 플레이어 정보 조회**

```javascript
interface Player {
  playerId: string;
  nickname: string;
}

export interface IPlayer {
  rows: Player[];
}
// 플레이어 정보를 조회하는 함수
// PlayerBasicInfo 컴포넌트에서 사용
export async function getPlayer(nickname: string): Promise<IPlayer> {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players?nickname=${nickname}&apikey=${API_KEY}`
  );
  return response.data;
}
```

**2번 API: 플레이어 상세 정보 조회**

```javascript
interface Record {
  gameTypeId: string;
  winCount: number;
  loseCount: number;
  stopCount: number;
}

export interface IPlayerInfo {
  playerId: string;
  nickname: string;
  grade: number;
  tierTest: boolean;
  represent: {
    characterId: string,
    characterName: string,
  };
  clanName: string;
  ratingPoint: number | null;
  maxRatingPoint: number | null;
  tierName: string | null;
  records: Record[];
}

// 플레이어 상세 정보를 조회하는 함수
// PlayerBasicInfo 컴포넌트에서 사용
export async function getPlayerInfo(playerId: string): Promise<IPlayerInfo> {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players/${playerId}?apikey=${API_KEY}`
  );
  return response.data;
}
```

**3번 API: 매칭 정보 조회**

```javascript
interface PartyInfo {
  result: string;
  playerId: string;
  nickname: string;
  characterId: string;
  characterName: string;
}

interface MatchRecord {
  date: string;
  matchId: string;
  playInfo: {
    partyInfo: PartyInfo[],
  };
}

export interface PlayerInfo {
  matches: {
    rows: MatchRecord[],
  };
}

// 플레이어 ID로 매칭 정보를 조회하는 함수
// PlayerBasicInfo 컴포넌트에서 사용
export async function getMatching(
  playerId: string,
  gameTypeId: boolean = false
): Promise<PlayerInfo> {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players/${playerId}/matches?gameTypeId=${
      gameTypeId ? "normal" : "rating"
    }&apikey=${API_KEY}`
  );
  return response.data;
}
```

## API들을 이용해 최종 수정된 데이터 인터페이스

### 플레이어 기본 정보

```javascript
{
  playerId: string;
  nickname: string;
  winRate: number;
  pickRate: number;
}
```

- **사용된 API:** 1번 API, 2번 API
- **적용된 컴포넌트:** PlayerBasicInfo, PlayerInfoCard

### 함께 플레이한 유저 목록

```javascript
interface IParty {
  partyUser: string;
  partyCount: number;
}
```

- **사용된 API:** 3번 API
- **적용된 컴포넌트:** MostChampBox
- MostChampBox 컴포넌트에서 위의 플레이어 기본 정보 데이터를 수정하여 완성

## Recoil Atom 설정

매칭 데이터를 전역 상태로 관리하기 위해 Recoil의 Atom을 설정한다.

```javascript
// 노말 매칭 데이터 Atom
export const normalMatchingAtom =
  (atom < PlayerInfo) | (null > { key: "normalMatching", default: null });
export const normalMatshingLoadingAtom = atom({
  key: "normalMatshingLoading",
  default: false,
});

// 레이팅 매칭 데이터 Atom
export const ratingMatchingAtom =
  (atom < PlayerInfo) | (null > { key: "ratingMatching", default: null });
export const ratingMatshingLoadingAtom = atom({
  key: "ratingMatshingLoading",
  default: false,
});

// 모든 매칭 데이터 Atom
export const allMatchingAtom =
  (atom < PlayerInfo) | (null > { key: "allMatching", default: null });
export const allMatshingLoadingAtom = atom({
  key: "allMatshingLoading",
  default: false,
});
```

## 컴포넌트별 데이터 변환 과정

### 1. Home 컴포넌트

- 닉네임을 입력받고, 검색 기록을 로컬 스토리지에 저장

```javascript
interface IForm { nickname: string; }

function Home() {
  const nav = useNavigate();
  const [search, setSearch] = useRecoilState(searchHistory);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onPlayerSubmit = ({ nickname }: IForm) => {
    // 검색 기록을 업데이트하여 로컬스토리지에 저장
    setSearch((prev) => {
      const existArray = [...prev, { firstName: nickname.charAt(0), fullName: nickname }];
      return [...new Set(existArray)];
    });
    // 검색 후 해당 플레이어의 상세 페이지로 이동
    nav(`/${nickname}/mostcyall`);
    setValue("nickname", ""); // 검색 입력 필드 초기화
  };

  return (
    <div className="space-y-5">
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <p className="text-2xl mb-7">플레이어 전적검색</p>
        <form onSubmit={handleSubmit(onPlayerSubmit)} className="flex h-10 ring-4 ring-black">
          <SearchInputBtn register={register("nickname", { required: true })} text="검색할 플레이어의 닉네임을 입력하세요" required />
        </form>
        <SearchHistory nav={nav} search={search} setSearch={setSearch} />
      </div>
      <div className="p-3 space-y-8 bg-white drop-shadow-md h-[330px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
```

### 2. PlayerBasicInfo 컴포넌트

- 플레이어 정보를 조회하고, 매칭 데이터를 Recoil 상태로 관리

```javascript
function PlayerBasicInfo() {
  const { nickname } = useParams();
  const mostcyallMatch = useMatch("/:nickname/mostcyall");
  const mostcyratingMatch = useMatch("/:nickname/mostcyrating");
  const mostcynomalMatch = useMatch("/:nickname/mostcynomal");
  const nav = useNavigate();

  // 플레이어 닉네임으로 플레이어 ID를 가져오는 쿼리
  const { data: nicknameData } = useQuery(["playerNickname", nickname], () => getPlayer(nickname + ""));

  // 플레이어 ID로 플레이어 상세 정보를 가져오는 쿼리
  const { data: playerInfoData } = useQuery(
    ["playerInfo", nicknameData],
    () => getPlayerInfo(nicknameData?.rows[0].playerId + ""),
    { enabled: !!nicknameData }
  );

  // 노말 매칭 데이터 및 로딩 상태 관리
  const { data: normalMatshingData } = useQuery(
    ["normalPlayeId", playerInfoData?.playerId],
    () => getMatching(playerInfoData?.playerId + "", true),
    { enabled: !!playerInfoData }
  );
  const setNormalMatshingData = useSetRecoilState(normalMatchingAtom);
  const setNormalMatchingLoading = useSetRecoilState(normalMatshingLoadingAtom);
  useEffect(() => {
    setNormalMatshingData(normalMatshingData);
    setNormalMatchingLoading(false);
  }, [normalMatshingData]);

  // 레이팅 매칭 데이터 및 로딩 상태 관리
  const { data: ratingMatshingData } = useQuery(
    ["ratingPlayeId", playerInfoData?.playerId],
    () => getMatching(playerInfoData?.playerId + ""),
    { enabled: !!playerInfoData }
  );
  const setRatingMatshingData = useSetRecoilState(ratingMatchingAtom);
  const setRatingMatchingLoading = useSetRecoilState(ratingMatshingLoadingAtom);
  useEffect(() => {
    setRatingMatshingData(ratingMatshingData);
    setRatingMatchingLoading(false);
  }, [ratingMatshingData]);

  // 모든 매칭 데이터를 통합하여 관리
  const setAllLoading = useSetRecoilState(allMatshingLoadingAtom);
  const setAllMatchingData = useSetRecoilState(allMatchingAtom);
  useEffect(() => {
    if (normalMatshingData && ratingMatshingData) {
      const combinedData = allMatchData(
        false, // normalMatshingLoading
        false, // ratingMatshingLoading
        normalMatshingData,
        ratingMatshingData
      );
      setAllMatchingData(combinedData);
      setAllLoading(false);
    }
  }, [normalMatshingData, ratingMatshingData]);

  // 검색 시 초기 하위 라우트를 mostcyall로 설정
  useEffect(() => {
    nav("mostcyall");
  }, [nickname, nav]);

  return (
    <>
      <div className="flex items-center justify-between mb-7">
        <p className="text-2xl">플레이어 기본 정보</p>
      </div>
      <main className=" h-60">
        <PlayerInfoCard loading={!playerInfoData} playerInfoData={playerInfoData!} />
      </main>
      <div className="h-[330px] bg-white">
        <div className="h-full">
          <div className="grid grid-cols-3">
            <Link to="mostcyall" className={mostcyallMatch ? "text-red-300" : ""}>전체</Link>
            <Link to="mostcyrating" className={mostcyratingMatch ? "text-red-300" : ""}>공식</Link>
            <Link to="mostcynomal" className={mostcynomalMatch ? "text-red-300" : ""}>일반</Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default PlayerBasicInfo;
```

### 3. PlayerInfoCard 컴포넌트

플레이어의 기본 정보를 화면에 표시

```javascript
interface PlayerInfoProps {
  loading: boolean;
  playerInfoData: IPlayerInfo;
}

function PlayerInfoCard({ loading, playerInfoData }: PlayerInfoProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold">
          {loading ? (
            <Skeleton width={200} height={"100%"} />
          ) : (
            playerInfoData?.nickname ?? "Unknown"
          )}
        </span>
        <span className="text-sm">
          {loading ? (
            <Skeleton width={100} />
          ) : (
            playerInfoData?.clanName ?? "Unknown"
          )}
        </span>
        <span className="mt-2 text-slate-400">
          {loading ? <Skeleton width={40} /> : playerInfoData?.grade ?? "0"}
        </span>
      </div>
      <article className="grid grid-cols-2">
        {loading ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <Skeleton width={50} />
              <Skeleton width={"64px"} circle height={"64px"} />
              <Skeleton width={100} />
              <Skeleton width={30} />
              <Skeleton width={70} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Skeleton width={50} />
              <Skeleton width={"64px"} circle height={"64px"} />
              <Skeleton width={100} />
              <Skeleton width={30} />
              <Skeleton width={70} />
            </div>
          </>
        ) : (
          <>
            <ImgOrRankAndRate playerInfoData={playerInfoData!} />
            <ImgOrRankAndRate playerInfoData={playerInfoData!} normal />
          </>
        )}
      </article>
    </>
  );
}

export default PlayerInfoCard;
```

### 4. MostCyAll, MostCyNomal, MostCyRating 컴포넌트

각 컴포넌트는 매칭 데이터를 가져와 화면에 표시

#### MostCyAll 컴포넌트

```javascript
function MostCyAll() {
  const combinedData = useRecoilValue(allMatchingAtom);
  const allLoading = useRecoilValue(allMatshingLoadingAtom);
  return (
    <MostChampBox
      category="전체"
      matshingData={combinedData}
      matshingLoading={allLoading}
    />
  );
}

export default MostCyAll;
```

#### MostCyNomal 컴포넌트

```javascript
function MostCyNomal() {
  const matshingData = useRecoilValue(normalMatchingAtom);
  const matchingLoading = useRecoilValue(normalMatshingLoadingAtom);

  return (
    <MostChampBox
      category="일반"
      matshingData={matshingData!}
      matshingLoading={matchingLoading}
    />
  );
}

export default MostCyNomal;
```

#### MostCyRating 컴포넌트

```javascript
function MostCyRating() {
  const matshingData = useRecoilValue(ratingMatchingAtom);
  const matchingLoading = useRecoilValue(ratingMatshingLoadingAtom);
  return (
    <MostChampBox
      category="공식"
      matshingData={matshingData!}
      matshingLoading={matchingLoading}
    />
  );
}

export default MostCyRating;
```

### 5. MostChampBox 컴포넌트

- 매칭 데이터를 기반으로 파티 유저 정보를 생성하고 화면에 표시

```javascript
interface IParty {
  partyUser: string;
  partyCount: number;
}

interface IMostChampBox {
  category: string;
  matshingData: PlayerInfo;
  matshingLoading: boolean;
}

function MostChampBox({ category, matshingData, matshingLoading }: IMostChampBox) {
  // 파티 유저의 닉네임과 플레이 횟수를 담은 배열 생성, 파티 유저가 없을 경우 솔로플레이 처리
  let namesArray: string[] = [];
  let partyArray: partyInfo[] = [];

  matshingData?.matches?.rows.forEach((item) => {
    if (item.playInfo.partyInfo.length === 0) {
      partyArray.push({
        result: item.playInfo.result,
        playerId: matshingData.playerId,
        nickname: "솔로플레이",
        characterId: item.playInfo.characterId,
        characterName: item.playInfo.characterName,
      });
    } else {
      item.playInfo.partyInfo.forEach((party) => {
        partyArray.push(party);
        namesArray.push(party.nickname);
      });
    }
  });

  const uniqueNamesArray = ["솔로플레이", ...new Set(namesArray)];
  let partyMatchingCount: IParty[] = uniqueNamesArray.map((name) => {
    const count = partyArray.filter((party) => party.nickname === name).length;
    return { partyUser: name, partyCount: count };
  });

  return (
    <main className="grid h-full grid-cols-3">
      <section className="col-span-2 p-2">
        <header className="my-4 text-2xl font-medium">모스트 사이퍼 ({category})</header>
        <article className="flex flex-col items-center justify-between">
          <span className="w-full p-2 text-lg font-semibold">플레이 횟수</span>
          <MostChamp data={matshingData?.matches?.rows!} loading={matshingLoading} />
          <MostChamp data={matshingData?.matches?.rows!} loading={matshingLoading} findSecond secondColor />
        </article>
      </section>
      <section className="border-l">
        <header className="p-2 text-xl font-semibold text-center">함께 플레이한 유저</header>
        <article className="overflow-x-hidden text-sm h-[260px]">
          {matshingLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between px-5 py-3 border-b">
                <Skeleton width={50} height={20} />
                <Skeleton width={100} height={20} />
              </div>
            ))}
          {!matshingLoading &&
            partyMatchingCount.map((partyMatch) => (
              <section key={partyMatch.partyUser} className="flex items-center justify-between px-5 py-3 border-b">
                <span>{partyMatch.partyUser}</span>
                <div className="flex flex-col">
                  <span>{partyMatch.partyCount}회 플레이</span>
                </div>
              </section>
            ))}
        </article>
      </section>
    </main>
  );
}

export default MostChampBox;
```

## 요약

**1. Home 컴포넌트**

- 닉네임을 입력받아 검색 기록을 저장하고 해당 닉네임의 상세 페이지로 이동.

**2. PlayerBasicInfo 컴포넌트**

- 닉네임으로 플레이어 ID를 조회하고, ID로 상세 정보를 조회하여 Recoil 상태로 저장.
- 노말 및 레이팅 매칭 데이터를 각각 조회하고, Recoil 상태로 저장.
- 모든 매칭 데이터를 통합하여 Recoil 상태로 저장.

**3. PlayerInfoCard 컴포넌트**

- PlayerBasicInfo 컴포넌트에서 조회한 플레이어의 기본 정보를 화면에 표시.
- Skeleton 컴포넌트를 사용하여 로딩 상태를 표시.

**4. MostCyAll, MostCyNomal, MostCyRating 컴포넌트**

- Recoil 상태에서 데이터를 가져와 화면에 표시.

**5. MostChampBox 컴포넌트**

- 매칭 데이터를 기반으로 파티 유저 목록을 생성하고 화면에 표시.
