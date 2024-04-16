import { MatchRecord } from "../api";

export function makeImagePath(characterId: string) {
  return `https://img-api.neople.co.kr/cy/characters/${characterId}?zoom=2`;
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

//스코어 평균 계산
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

//레이팅 점수에 따른 티어 반환
export function calculateTier(score: number): string {
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
}

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
