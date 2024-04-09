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
