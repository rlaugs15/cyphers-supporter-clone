import { CharacterRanking, MatchRecord, PlayerInfo, partyInfo } from "../api";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const contentBoxStyle = "p-3 bg-white drop-shadow-md";
export const contentTitleStyle = "text-2xl mb-7";

//mater 태그의 바 색을 검정으로
export const meterStylesBlack = `
    meter::-webkit-meter-optimum-value {
      background: #000;
    }
    meter::-webkit-meter-suboptimum-value {
      background: #000;
    }
    meter::-webkit-meter-even-less-good-value {
      background: #000;
    }
    meter::-moz-meter-bar {
      background: #000;
    }
  `;

//KDA 계산
export function winningRate(
  winCount: number,
  loseCount: number,
  stopCount: number
) {
  // 전체 게임 수 계산
  const totalGames = winCount + loseCount + stopCount;

  // 승률 계산
  const winRate = (winCount / totalGames) * 100;

  return winRate.toFixed(2);
}

//레이팅 점수에 따른 티어 반환 (api에 티어네임이 있어서 삭제)
/* export function calculateTier(score: number): string {
  // 티어 임계값과 해당하는 티어 정의
  const tierThresholds: [number, number, string][] = [
    [0, 1287, "Bronze 5"],
    [1288, 1744, "Bronze 4"],
    [1745, 2370, "Bronze 3"],
    [2371, 3165, "Bronze 2"],
    [3166, 4129, "Bronze 1"],
    [4130, 5262, "Silver 5"],
    [5263, 6564, "Silver 4"],
    [6565, 8035, "Silver 3"],
    [8036, 9675, "Silver 2"],
    [9676, 11484, "Silver 1"],
    [11485, 13462, "Gold 5"],
    [13463, 15609, "Gold 4"],
    [15610, 17925, "Gold 3"],
    [17926, 20410, "Gold 2"],
    [20411, 23064, "Gold 1"],
    [23065, 25887, "Joker 5"],
    [25888, 28879, "Joker 4"],
    [28880, 32040, "Joker 3"],
    [32041, 35370, "Joker 2"],
    [35371, 38869, "Joker 1"],
    [38870, 42537, "Ace 5"],
    [42538, 46374, "Ace 4"],
    [46375, 50380, "Ace 3"],
    [50381, 54555, "Ace 2"],
    [54556, 58899, "Ace 1"],
    [58900, Infinity, "Hero"],
  ];

  // 주어진 점수에 해당하는 티어 찾기
  for (const threshold of tierThresholds) {
    if (threshold[0] <= score && score <= threshold[1]) {
      return threshold[2];
    }
  }

  // 점수가 범위를 벗어난 경우 "Unknown" 반환
  return "Unknown";
} */

//현재 시간과 한 달 전의 시간을 생성
export class CustomDateFormatter {
  private now: Date;
  private oneMonthAgo: Date;

  constructor() {
    this.now = new Date();
    this.oneMonthAgo = new Date(this.now);
    this.oneMonthAgo.setMonth(this.now.getMonth() - 1);
  }

  private formatTime(date: Date): string {
    return (
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      "T" +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2)
    );
  }

  public getCurrentTime(): string {
    return this.formatTime(this.now);
  }

  public getOneMonthAgoTime(): string {
    return this.formatTime(this.oneMonthAgo);
  }
}

//가장 많은 중복되는 characterName을 찾는 함수
export function findMostChamp(records: MatchRecord[]): string {
  // 각 characterName의 등장 횟수를 세기 위한 객체 생성
  const countMap: Record<string, number> = {};
  records.map((record) => {
    const { characterName } = record.playInfo;
    countMap[characterName] = (countMap[characterName] || 0) + 1;
  });

  // 가장 많이 중복된 값의 등장 횟수 찾기
  const maxCount = Math.max(...Object.values(countMap));

  // 가장 많이 중복된 characterName을 가진 요소들을 새 배열에 넣어 반환
  const mostCommonCharacterNames: string[] = [];
  for (const [characterName, count] of Object.entries(countMap)) {
    if (count === maxCount) {
      mostCommonCharacterNames.push(characterName);
    }
  }

  return mostCommonCharacterNames.join();
}

//두 번째로 많은 중복되는 characterName을 찾는 함수
export function findSecondMostChamp(records: MatchRecord[]): string | null {
  // 각 characterName의 등장 횟수를 세기 위한 객체 생성
  const countMap: Record<string, number> = {};
  records.map((record) => {
    const { characterName } = record.playInfo;
    countMap[characterName] = (countMap[characterName] || 0) + 1;
  });

  // 가장 많이 중복된 캐릭터를 찾기
  const maxCount = Math.max(...Object.values(countMap));

  // 가장 많이 중복된 캐릭터를 제외한 나머지 중에서 두 번째로 많이 중복된 캐릭터를 찾기
  let secondMaxCount = -1; // 두 번째로 많이 중복된 캐릭터의 등장 횟수 초기화
  let secondMostCommonCharacter: string | null = null;

  for (const [characterName, count] of Object.entries(countMap)) {
    if (count !== maxCount && count > secondMaxCount) {
      secondMaxCount = count;
      secondMostCommonCharacter = characterName;
    }
  }

  return secondMostCommonCharacter;
}

//입력된 킬이나 데스 등의 평균 값
export function scoreAverage(
  records: MatchRecord[],
  count: "killCount" | "deathCount" | "assistCount"
): number {
  let newArray: any[] = [];
  records
    ?.filter((item) => item?.playInfo?.[count])
    .map((item) => (newArray = [...newArray, item?.playInfo?.[count]]));

  const totalCount = newArray?.reduce((a, b) => a + b, 0);
  const averageCount = totalCount / newArray.length;
  return averageCount;
}

interface PartySummary {
  partyMembers: string;
  playCount: number;
  winRate: number;
}

export function analyzeParty(playInfo: partyInfo[]): PartySummary {
  const playCount = playInfo.length;
  const winCount = playInfo.filter((info) => info.result === "win").length;
  const winRate = playCount > 0 ? (winCount / playCount) * 100 : 0;
  const partyMembers = playInfo.map((info) => info.nickname).join(", ");

  return { partyMembers, playCount, winRate };
}

//공식, 일반전의 매칭 데이터를 합치는 함수
export function allMatchData(
  normalMatshingLoading: boolean,
  ratingMatshingLoading: boolean,
  normalMatshingData: PlayerInfo,
  ratingMatshingData: PlayerInfo
) {
  if (normalMatshingLoading || ratingMatshingLoading) {
    return null;
  }

  if (!normalMatshingData || !ratingMatshingData) {
    return null;
  }

  const allData = [
    ...normalMatshingData.matches.rows,
    ...ratingMatshingData.matches.rows,
  ];

  return {
    ...normalMatshingData,
    matches: { ...normalMatshingData.matches, rows: allData },
  };
}

//포지션에 따라 해당 포지션의 첫글자와 색깔이 객체로 나오는 프로필
export function playPosition(position: string) {
  if (position === "원거리딜러") {
    return { positionName: "원", positionColor: "bg-purple-500" };
  } else if (position === "근거리딜러") {
    return { positionName: "근", positionColor: "bg-red-500" };
  } else if (position === "탱커") {
    return { positionName: "탱", positionColor: "bg-blue-500" };
  } else if (position === "서포터") {
    return { positionName: "폿", positionColor: "bg-yellow-300" };
  }
}

//분당 cs 평균 계산
export const calculateAverageCS = (
  sentinelKillCount: number,
  demolisherKillCount: number,
  playTime: number
) => {
  // 총 CS를 계산합니다.
  const totalCS = sentinelKillCount + demolisherKillCount;

  // 분 단위로 시간을 변환합니다.
  const minutes = playTime / 60;

  // 분당 CS를 계산합니다.
  const csPerMinute = totalCS / minutes;

  // 결과를 반환합니다.
  return csPerMinute.toFixed(1);
};

//아이템의 티어를 받아서 티어의 색깍을 반환
export function selectRarityColor(
  rarityName: string,
  textColor: boolean = false
) {
  let itemColor = "";
  if (!textColor) {
    if (rarityName === "유니크") {
      itemColor = "bg-pink-500";
    } else if (rarityName === "레어") {
      itemColor = "bg-purple-500";
    } else if (rarityName === "언커먼") {
      itemColor = "bg-blue-500";
    } else if (rarityName === "커먼") {
      itemColor = "bg-black";
    }
  } else if (textColor) {
    if (rarityName === "유니크") {
      itemColor = "#D7379B";
    } else if (rarityName === "레어") {
      itemColor = "#805AD5";
    } else if (rarityName === "언커먼") {
      itemColor = "#3B82F6";
    } else if (rarityName === "커먼") {
      itemColor = "#000000";
    }
  }

  return itemColor;
}

type AverrageArg = (charactersData: CharacterRanking) => number[];

//숫자가 들어있는 배열의 평균 값 구하기
export function calculateAverage(
  charactersData: CharacterRanking,
  averrageArg: AverrageArg
) {
  const callwinRateList = averrageArg(charactersData);
  if (!callwinRateList) {
    throw new Error("잘못된 입력: 콜백함수가 올바르게 작동하지 않습니다.");
  }

  const sum = callwinRateList.reduce((accumulator, currentValue) => {
    if (typeof currentValue !== "number") {
      throw new Error("잘못된 입력: 배열에는 숫자만 포함되어야 합니다.");
    }
    return accumulator + currentValue;
  }, 0);

  const average = sum / callwinRateList.length;

  // 소수점 4자리까지 반올림
  return Math.round(average * 10000) / 10000;
}
