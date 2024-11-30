# 플레이어 전적비교 및 매치정보 조회 페이지(파티원 목록 추가)

## API 구성

플레이어의 기본 정보와 매칭 정보를 가져오기 위해 세 개의 API를 사용한다.

### 1번 API: 플레이어 정보 조회

```javascript
interface Row {
  playerId: string;
  nickname: string;
  represent: {
    characterId: string,
    characterName: string,
  };
  grade: number;
}

export interface IPlayer {
  rows: Row[];
}

// 플레이어 정보를 조회하는 함수
export async function getPlayer(nickname: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players?nickname=${nickname}&apikey=${API_KEY}`
  );
  return response.data;
}
```

### 2번 API: 플레이어 상세 정보 조회

```javascript
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
  records: {
    gameTypeId: string,
    winCount: number,
    loseCount: number,
    stopCount: number,
  }[];
}

// 플레이어 상세 정보를 조회하는 함수
export async function getPlayerInfo(playerId: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players/${playerId}?apikey=${API_KEY}`
  );
  return response.data;
}
```

### 3번 API: 매칭 정보 조회

```javascript
export interface partyInfo {
  result: string;
  playerId: string;
  nickname: string;
  characterId: string;
  characterName: string;
}

export interface MatchRecord {
  date: string;
  matchId: string;
  map: {
    mapId: string,
    name: string,
  };
  playInfo: {
    partyDisplay: string,
    result: string,
    random: boolean,
    partyUserCount: number,
    partyInfo: partyInfo[],
    playTypeName: string,
    characterId: string,
    characterName: string,
    level: number,
    killCount: number,
    deathCount: number,
    assistCount: number,
    attackPoint: number,
    damagePoint: number,
    battlePoint: number,
    sightPoint: number,
    towerAttackPoint: number,
    backAttackCount: number,
    comboCount: number,
    spellCount: number,
    healAmount: number,
    sentinelKillCount: number,
    demolisherKillCount: number,
    trooperKillCount: number,
    guardianKillCount: number,
    guardTowerKillCount: number,
    getCoin: number,
    spendCoin: number,
    spendConsumablesCoin: number,
    playTime: number,
    responseTime: number,
    minLifeTime: number,
    maxLifeTime: number,
  };
  position: {
    name: string,
    explain: string,
    attribute: {
      level: number,
      id: string,
      name: string,
    }[],
  };
}

interface MatchDate {
  start: string;
  end: string;
}

interface Match {
  map(arg0: (record: any) => any): unknown;
  date: MatchDate;
  gameTypeId: string;
  next: string;
  rows: MatchRecord[];
}

export interface PlayerInfo {
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
  records: {
    gameTypeId: string,
    winCount: number,
    loseCount: number,
    stopCount: number,
  }[];
  matches: Match;
}
//클래스는 utils.ts 참고
//CustomDateFormatter: 두 개의 날짜를 저장하고 이 날짜를 특정 형식으로 포맷하는 기능을 제공하는 클래스
//getCurrentTime(): 현재 날짜와 시간을 포맷한 후 문자열로 반환
const dateFormatter = new CustomDateFormatter();

//// 플레이어 ID로 매칭 정보를 조회하는 함수
export async function getMatching(
  playerId: string,
  gameTypeId: boolean = false
) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players/${playerId}/matches?gameTypeId=${
      gameTypeId ? "normal" : "rating"
    }&startDate=${dateFormatter.getOneMonthAgoTime()}&endDate=${dateFormatter.getCurrentTime()}&limit=100&apikey=${API_KEY}`
  );
  return response.data;
}
```

### 4번 API: 매칭 정보 상세 조회

```javascript
export interface DetailMatchItem {
  itemId: string; // 아이템의 고유 식별자
  itemName: string; // 아이템 이름 (예: "E 섬섬옥수")
  slotCode: string; // 슬롯 코드 (예: "101")
  slotName: string; // 슬롯 이름 (예: "손(공격)")
  rarityCode: string; // 희귀도 코드 (예: "104")
  rarityName: string; // 희귀도 이름 (예: "유니크")
  equipSlotCode: string; // 장비 슬롯 코드 (예: "101")
  equipSlotName: string; // 장비 슬롯 이름 (예: "손(공격)")
}

export interface Attribute {
  level: number; // 레벨
  id: string; // 속성의 고유 식별자
  name: string; // 속성 이름 (예: "사격술")
}

export interface DetailPosition {
  name: string; // 직책 이름 (예: "원거리딜러")
  explain: string; // 설명 (예: "치명타 피해량 +12%")
  attribute: Attribute[]; // 속성 배열
}

export interface DetailPlayerInfo {
  random: boolean; // 무작위 여부 (true 또는 false)
  partyUserCount: number; // 파티에 참여한 사용자 수
  partyId: string; // 파티의 고유 식별자
  playTypeName: string; // 플레이 유형 이름 (예: "정상")
  characterId: string; // 캐릭터의 고유 식별자
  characterName: string; // 캐릭터 이름
  level: number; // 캐릭터 레벨
  killCount: number; // 처치 횟수
  deathCount: number; // 사망 횟수
  assistCount: number; // 어시스트 횟수
  attackPoint: number; // 공격 포인트
  damagePoint: number; // 피해 포인트
  battlePoint: number; // 전투 포인트
  sightPoint: number; // 시야 포인트
  towerAttackPoint: number; // 타워 공격 포인트
  backAttackCount: number; // 후방 공격 횟수
  comboCount: number; // 콤보 횟수
  spellCount: number; // 스펠 사용 횟수
  healAmount: number; // 치유량
  sentinelKillCount: number; // 감시자 처치 횟수
  demolisherKillCount: number; // 파괴자 처치 횟수
  trooperKillCount: number; // 트루퍼 처치 횟수
  guardianKillCount: number; // 가디언 처치 횟수
  guardTowerKillCount: number; // 가드 타워 처치 횟수
  getCoin: number; // 획득한 코인
  spendCoin: number; // 사용한 코인
  spendConsumablesCoin: number; // 소모품 사용한 코인
  playTime: number; // 플레이 시간 (초 단위)
  responseTime: number; // 응답 시간 (밀리초 단위)
  minLifeTime: number; // 최소 생존 시간 (초 단위)
  maxLifeTime: number; // 최대 생존 시간 (초 단위)
}
export interface DetailPlayer {
  playerId: string;
  nickname: string;
  map: {
    mapId: string,
    name: string,
  };
  playInfo: DetailPlayerInfo;
  position: DetailPosition;
  items: DetailMatchItem[];
}

interface Team {
  result: "win" | "lose";
  players: string[];
}

export interface DetailMatchData {
  date: string;
  gameTypeId: string;
  map: {
    mapId: string,
    name: string,
  };
  teams: Team[];
  players: DetailPlayer[];
}

export async function getDetailMatching(matchId: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/matches/${matchId}?apikey=${API_KEY}`
  );
  return response.data;
}
```

## API들을 이용해 최종 수정된 데이터 인터페이스

### 함께 플레이한 유저 목록

```javascript
interface ParyMember {
  partyId: string;
  partyMember: string;
}
```

- **사용된 API:** 4번 API
- **컴포넌트:** Match, MatchPlayInfo
- 각 유저마다 파티 멤버가 들어간 배열을 추가하기 위한 목적

## 컴포넌트 간 데이터 변환 요약

- **Players 컴포넌트:** 검색된 두 플레이어의 닉네임을 저장하고 PlayersComparison으로 이동

- **PlayersComparison 컴포넌트:** 플레이어 정보와 매칭 데이터를 API로 가져와서 비교하고 화면에 표시

---

- **Matches 컴포넌트:** 특정 매치의 상세 정보를 조회하고 화면에 표시

- **PlayerInfoCard 컴포넌트:** PlayersComparison에서 가져온 플레이어 기본 정보를 화면에 표시

![](https://velog.velcdn.com/images/rlaugs15/post/d06fa52b-6ed8-4ffe-8304-40376e50dd9c/image.png)

### Players 컴포넌트

onPlayersSubmit으로 받은 nicknames을 공백이 제거된 문자열을 쉼표로 분할하여 배열로 만든다. 그리고 쿼리 스트링으로 전달한다.
**ex)** 검색창에 `박운애, 우르곳`이라는 2명의 플레이어 닉네임 입력 -> 쿼리스트링으로 전달

```javascript
interface IForm {
  nicknames: string;
}

function Players() {
  const nav = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onPlayersSubmit = ({ nicknames }: IForm) => {
    const cleanedNicknames = nicknames.replace(/\s+/g, "").split(",");
    nav(
      `playersinfo?player1=${cleanedNicknames[0]}&player2=${cleanedNicknames[1]}`
    );
    setValue("nicknames", "");
  };
  return (
    <div className="space-y-5">
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <p className="text-2xl mb-7">플레이어 전적검색</p>
        <form
          onSubmit={handleSubmit(onPlayersSubmit)}
          className="flex h-10 ring-4 ring-black"
        >
          <SearchInputBtn
            register={register("nicknames", { required: true })}
            text=",로 구분하여 플레이어의 닉네임을 입력하세요"
            required
          />
        </form>
      </div>
      <div className="grid h-auto grid-cols-2 gap-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Players;
```

### PlayersComparison 컴포넌트

**플레이어 정보와 매칭 데이터를 API로 가져와서 비교하고 화면에 표시**

- **allMatchData 함수:** 공식, 일반전의 매칭 데이터를 합치는 함수(utils.ts)
- PlayerInfoCard 컴포넌트로 합친 데이터를 전달
- RecentGameCard 컴포넌트 클릭 시 Matches 컴포넌트(`/matches/:matchId`)로 이동

```javascript
function PlayersComparison() {
  const [searchParams] = useSearchParams();
  const player1 = searchParams.get("player1");
  const player2 = searchParams.get("player2");

  // 닉네임 로딩
  const { isLoading: player1NicknameLoading, data: player1NicknameData } =
    useQuery<IPlayer>(["player1Nickname", player1], () =>
      getPlayer(player1 + "")
    );
  const { isLoading: player2NicknameLoading, data: player2NicknameData } =
    useQuery<IPlayer>(["player2Nickname", player2], () =>
      getPlayer(player2 + "")
    );

  // 플레이어 정보 로딩
  const { isLoading: player1InfoLoading, data: player1InfoData } =
    useQuery<IPlayerInfo>(["player1Info", player1NicknameData], () =>
      getPlayerInfo(player1NicknameData?.rows[0].playerId + "")
    );
  const { isLoading: player2InfoLoading, data: player2InfoData } =
    useQuery<IPlayerInfo>(["player2Info", player2NicknameData], () =>
      getPlayerInfo(player2NicknameData?.rows[0].playerId + "")
    );

  // 플레이어 일반전 매칭기록 로딩
  const { isLoading: player1NormalMatchLoading, data: player1NormalMatchData } =
    useQuery<PlayerInfo>(["player1Match", player1InfoData?.playerId], () =>
      getMatching(player1InfoData?.playerId + "", true)
    );
  const { isLoading: player2NormalMatchLoading, data: player2NormalMatchData } =
    useQuery<PlayerInfo>(["player2Match", player2InfoData?.playerId], () =>
      getMatching(player2InfoData?.playerId + "", true)
    );

  // 플레이어 공식전 매칭기록 로딩
  const { isLoading: player1RatingMatchLoading, data: player1RatingMatchData } =
    useQuery<PlayerInfo>(["player1Match", player1InfoData?.playerId], () =>
      getMatching(player1InfoData?.playerId + "")
    );
  const { isLoading: player2RatingMatchLoading, data: player2RatingMatchData } =
    useQuery<PlayerInfo>(["player2Match", player1InfoData?.playerId], () =>
      getMatching(player2InfoData?.playerId + "")
    );

  // 플레이어 모든 매칭기록 로딩
  //allMatchData 함수: 공식, 일반전의 매칭 데이터를 합치는 함수(utils.ts)
  const player1AllMatchData = allMatchData(
    player1NormalMatchLoading,
    player1RatingMatchLoading,
    player1NormalMatchData!,
    player1RatingMatchData!
  );
  const player2AllMatchData = allMatchData(
    player2NormalMatchLoading,
    player2RatingMatchLoading,
    player2NormalMatchData!,
    player2RatingMatchData!
  );

  const player1AllMatchLoading =
    player1NormalMatchLoading && player1RatingMatchLoading;
  const player2AllMatchLoading =
    player2NormalMatchLoading && player2RatingMatchLoading;

  return (
    <>
      <article className="p-4 bg-white">
        <section className="pb-4 border-b-2">
          <PlayerInfoCard
            loading={player1InfoLoading}
            playerInfoData={player1InfoData!}
          />
        </section>
        <RecentGameCard
          playerMatchData={player1AllMatchData!}
          playerAllMatchLoading={player1AllMatchLoading}
        />
      </article>
      <article className="p-4 bg-white">
        <section className="pb-4 border-b-2">
          <PlayerInfoCard
            loading={player2InfoLoading}
            playerInfoData={player2InfoData!}
          />
        </section>
        <RecentGameCard
          playerMatchData={player2AllMatchData!}
          playerAllMatchLoading={player2AllMatchLoading}
        />
      </article>
    </>
  );
}

export default PlayersComparison;
```

---

![](https://velog.velcdn.com/images/rlaugs15/post/0d5b21fe-b9b2-4325-afa9-2066c9f1bcb0/image.jpg)

### Matches 컴포넌트

**특정 매치의 상세 정보를 조회하고 화면에 표시**

- PlayersComparison 컴포넌트에서 캐릭터 카드를 클릭하여 Matches 컴포넌트로 이동
- selectPosiionFilter 함수로 api 데이터에서 승자팀과 패배팀을 분리하여 selectPartyUsers 함수로 전달
- selectPartyUsers 함수로 `파티유저`와 승패결과를 추가

```javascript
export interface ParyMember {
  partyId: string;
  partyMember: string;
}
interface IAddParyUser extends DetailPlayer {
  partyMembers: ParyMember[];
  matchResult: string;
}
interface IFilterTeams {
  filterWinner: DetailPlayer[];
  filterLoser: DetailPlayer[];
}

function Matches() {
  const { matchId } = useParams();

  const { isLoading: detailMatchingLoading, data: detailMatchingData } =
    useQuery<DetailMatchData>(["detailNatcing", matchId], () =>
      getDetailMatching(matchId + "")
    );

  // 승자팀과 패자팀으로 분류하는 함수
  const selectPosiionFilter = (detailMatchingData: DetailMatchData) => {
    const winners =
      detailMatchingData?.teams?.find((team) => team.result === "win")
        ?.players || [];
    const losers =
      detailMatchingData?.teams?.find((team) => team.result === "lose")
        ?.players || [];

    const winnerPlayerId = [...winners];
    const loserPlayerId = [...losers];

    let filterWinner: DetailPlayer[] = [];
    let filterLoser: DetailPlayer[] = [];

    for (const winner of winnerPlayerId) {
      for (const player of detailMatchingData?.players!) {
        if (winner === player.playerId) {
          filterWinner = [...filterWinner, player];
        }
      }
    }

    for (const winner of loserPlayerId) {
      for (const player of detailMatchingData?.players!) {
        if (winner === player.playerId) {
          filterLoser = [...filterLoser, player];
        }
      }
    }
    return {
      filterWinner,
      filterLoser,
    };
  };

  const filterTeams = selectPosiionFilter(detailMatchingData!);

  // filterTeams에 파티유저와 승패결과를 추가하는 함수
  const selectPartyUsers = (filterTeams: IFilterTeams) => {
    let addPartyWinner: IAddParyUser[] = [];
    let addPartyLoser: IAddParyUser[] = [];

    let partyUsers: ParyMember[] = [];

    // 각 유저의 id와 닉네임을 새로운 객체에 넣기
    for (const winner of filterTeams?.filterWinner) {
      partyUsers = [
        ...partyUsers,
        { partyId: winner.playInfo.partyId, partyMember: winner.nickname },
      ];
    }
    for (const loser of filterTeams?.filterLoser) {
      partyUsers = [
        ...partyUsers,
        { partyId: loser.playInfo.partyId, partyMember: loser.nickname },
      ];
    }

    // 각 유저의 객체에 파티맴버와 아이디 넣기
    // 솔로의 파티 아이디는 "b762303013093c43599c55f64fdcff53"
    for (const winner of filterTeams?.filterWinner) {
      let newPartyUsers: ParyMember[] = []; // 각 winner마다 새로운 배열 초기화
      for (const partyUser of partyUsers) {
        if (
          winner.playInfo.partyId !== "b762303013093c43599c55f64fdcff53" &&
          winner.nickname !== partyUser.partyMember &&
          winner.playInfo.partyId === partyUser.partyId
        ) {
          newPartyUsers = [
            ...newPartyUsers,
            { partyId: partyUser.partyId, partyMember: partyUser.partyMember },
          ];
        }
      }
      addPartyWinner = [
        ...addPartyWinner,
        {
          ...winner,
          partyMembers: [...newPartyUsers],
          matchResult: "win",
        },
      ];
    }

    for (const loser of filterTeams?.filterLoser) {
      let newPartyUsers: ParyMember[] = []; // 각 loser마다 새로운 배열 초기화
      for (const partyUser of partyUsers) {
        if (
          loser.playInfo.partyId !== "b762303013093c43599c55f64fdcff53" &&
          loser.nickname !== partyUser.partyMember &&
          loser.playInfo.partyId === partyUser.partyId
        ) {
          newPartyUsers = [
            ...newPartyUsers,
            { partyId: partyUser.partyId, partyMember: partyUser.partyMember },
          ];
        }
      }
      addPartyLoser = [
        ...addPartyLoser,
        {
          ...loser,
          partyMembers: [...newPartyUsers],
          matchResult: "lose",
        },
      ];
    }

    return { addPartyWinner, addPartyLoser };
  };

  const addReultWinners = selectPartyUsers(filterTeams).addPartyWinner;
  const addReultLosers = selectPartyUsers(filterTeams).addPartyLoser;

  return (
    <>
      {detailMatchingLoading ? (
        <div className="space-y-9">
          <header className="p-4 space-y-10 bg-white">
            <Skeleton width={160} height={30} />
            <div className="flex flex-col">
              <Skeleton width={100} />
              <Skeleton width={200} />
              <Skeleton width={160} />
              <Skeleton width={140} />
            </div>
          </header>
          <main className="p-4 space-y-4 bg-white">
            <header className="space-y-4">
              <span className="text-2xl">리포트</span>
              <section className="flex flex-col items-end">
                <Skeleton width={40} />
                <Skeleton width={40} />
              </section>
            </header>

            {[...Array.from(Array(11).keys())].map((item) => (
              <section key={item}>
                <Skeleton width={40} height={20} />
                <Skeleton width={"100%"} height={30} />
              </section>
            ))}
          </main>
        </div>
      ) : (
        <div className="space-y-9">
          <GameViewDetail detailMatchingData={detailMatchingData!} />
          <MatchsReport
            winners={filterTeams?.filterWinner}
            losers={filterTeams?.filterLoser}
          />
          <div className="bg-white">
            <span className="block px-3 py-4 text-2xl">플레이 정보</span>
            <main className="flex grid-cols-2">
              <section className="grid w-full grid-cols-1">
                {addReultWinners?.map((winner) => (
                  <MatchPlayInfo
                    key={winner.playerId}
                    items={winner.items}
                    matchResult={winner.matchResult}
                    nickname={winner.nickname}
                    partyMembers={winner.partyMembers}
                    playInfo={winner.playInfo}
                    position={winner.position}
                  />
                ))}
              </section>
              <section className="w-full grid-cols-1 bg-red-400">
                {addReultLosers?.map((loser) => (
                  <MatchPlayInfo
                    key={loser.playerId}
                    items={loser.items}
                    matchResult={loser.matchResult}
                    nickname={loser.nickname}
                    partyMembers={loser.partyMembers}
                    playInfo={loser.playInfo}
                    position={loser.position}
                  />
                ))}
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default Matches;
```

### MatchPlayInfo 컴포넌트

**캐릭터의 매칭 상세정보를 화면에 표시**

- Matches 컴포넌트로부터 api가 수정되어 파티맴버가 추가된 캐릭터 상세 정보를 화면에 표시

```javascript
interface MatchPlayInfoProps {
  items: DetailMatchItem[];
  matchResult: string;
  nickname: string;
  partyMembers: ParyMember[];
  playInfo: DetailPlayerInfo;
  position: DetailPosition;
}

function MatchPlayInfo({
  items,
  matchResult,
  nickname,
  partyMembers,
  playInfo,
  position,
}: MatchPlayInfoProps) {
  const allCs = playInfo?.sentinelKillCount + playInfo?.demolisherKillCount;

  const nav = useNavigate();
  const onSearchClick = (nickname: string) => {
    nav(`/${nickname}/mostcyall`);
  };
  const csAverage = calculateAverageCS(
    playInfo?.sentinelKillCount,
    playInfo?.demolisherKillCount,
    playInfo?.playTime
  );
  return (
    <article
      className={cls(matchResult === "win" ? "bg-blue-200" : "bg-red-200")}
    >
      <header
        className={cls(
          "flex items-center justify-between px-3 py-1",
          matchResult === "win" ? "bg-blue-400" : "bg-red-400"
        )}
      >
        <div className="flex flex-col font-semibold text-white">
          <span>
            [
            {partyMembers.length >= 1
              ? `${partyMembers.length + 1}인 파티`
              : "솔로"}
            /{playInfo?.random ? "랜덤" : "선택"}]
          </span>
          <span>{nickname}</span>
        </div>
        <div className="flex space-x-2">
          {position?.attribute.map((att) => (
            <AttCards key={att.id} id={att.id} name={att.name} />
          ))}
        </div>
      </header>
      <main className="p-2 space-y-3">
        <section className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChampAndPositionCard
              matchResult={matchResult}
              characterId={playInfo?.characterId}
              positionName={position?.name}
            />
            <figcaption
              onClick={() => onSearchClick(nickname)}
              className={cls(
                "text-sm text-slate-500 hover:ring hover:ring-offset-2 hover:cursor-pointer p-1 transition",
                matchResult === "win"
                  ? "hover:ring-blue-400"
                  : "hover:ring-red-400"
              )}
            >
              <span className="flex text-base font-semibold text-black">
                (Lv {playInfo?.level}) {playInfo?.characterName}
              </span>
              <span className="flex">
                <p
                  className={cls(
                    matchResult === "win" ? "text-blue-400" : "text-red-400"
                  )}
                >
                  (KDA:{" "}
                  {winningRate(
                    playInfo?.killCount,
                    playInfo?.deathCount,
                    playInfo?.assistCount
                  )}
                  )
                </p>
                {playInfo?.killCount}킬 {playInfo?.deathCount}데스
                {playInfo?.assistCount}어시
              </span>
              <span className="flex">
                <p
                  className={cls(
                    matchResult === "win" ? "text-blue-400" : "text-red-400"
                  )}
                >
                  (분당 CS: {csAverage})
                </p>
                CS: {allCs}개
              </span>
            </figcaption>
          </div>
          <GameStats playInfo={playInfo} />
        </section>
        <section className="flex items-center space-x-1 h-7">
          {partyMembers?.map((member) => (
            <PartyMember
              key={member.partyId}
              partyId={member.partyId}
              partyMember={member.partyMember}
              matchResult={matchResult}
            />
          ))}
        </section>
        <section className="grid grid-cols-8 gap-1 mx-10">
          {items?.map((item) => (
            <ItemCard
              key={item.itemId}
              itemId={item.itemId}
              itemName={item.itemName}
              rarityName={item.rarityName}
            />
          ))}
        </section>
      </main>
    </article>
  );
}

export default MatchPlayInfo;
```
