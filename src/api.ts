import axios from "axios";
import { CustomDateFormatter } from "./libs/utils";

const BASE_PATH = "https://api.neople.co.kr";
const API_KEY = import.meta.env.VITE_API_KEY;

interface Row {
  playerId: string;
  nickname: string;
  represent: {
    characterId: string;
    characterName: string;
  };
  grade: number;
}

export interface IPlayer {
  rows: Row[];
}

export async function getPlayer(nickname: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players?nickname=${nickname}&apikey=${API_KEY}`
  );
  return response.data;
}

export interface IPlayerInfo {
  playerId: string;
  nickname: string;
  grade: number;
  tierTest: boolean;
  represent: {
    characterId: string;
    characterName: string;
  };
  clanName: string;
  ratingPoint: number | null;
  maxRatingPoint: number | null;
  tierName: string | null;
  records: {
    gameTypeId: string;
    winCount: number;
    loseCount: number;
    stopCount: number;
  }[];
}

export async function getPlayerInfo(playerId: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players/${playerId}?apikey=${API_KEY}`
  );
  return response.data;
}

export interface MatchRecord {
  date: string;
  matchId: string;
  map: {
    mapId: string;
    name: string;
  };
  playInfo: {
    result: string;
    random: boolean;
    partyUserCount: number;
    partyInfo: any[]; // 이 부분은 플레이어 파티 정보에 대한 데이터 구조에 따라서 수정해야 합니다.
    playTypeName: string;
    characterId: string;
    characterName: string;
    level: number;
    killCount: number;
    deathCount: number;
    assistCount: number;
    attackPoint: number;
    damagePoint: number;
    battlePoint: number;
    sightPoint: number;
    towerAttackPoint: number;
    backAttackCount: number;
    comboCount: number;
    spellCount: number;
    healAmount: number;
    sentinelKillCount: number;
    demolisherKillCount: number;
    trooperKillCount: number;
    guardianKillCount: number;
    guardTowerKillCount: number;
    getCoin: number;
    spendCoin: number;
    spendConsumablesCoin: number;
    playTime: number;
    responseTime: number;
    minLifeTime: number;
    maxLifeTime: number;
  };
  position: {
    name: string;
    explain: string;
    attribute: {
      level: number;
      id: string;
      name: string;
    }[];
  };
}

interface MatchDate {
  start: string;
  end: string;
}

interface Match {
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
    characterId: string;
    characterName: string;
  };
  clanName: string;
  ratingPoint: number | null;
  maxRatingPoint: number | null;
  tierName: string | null;
  records: {
    gameTypeId: string;
    winCount: number;
    loseCount: number;
    stopCount: number;
  }[];
  matches: Match;
}

const dateFormatter = new CustomDateFormatter();
//https:api.neople.co.kr/cy/players/00b7cc76104cd3d1dad04e227dc6d325/matches?gameTypeId=normal&&startDate=20240311T0623&endDate=20240411T0623&limit=100&apikey=AR5FRcTpheYlQiA8tMc3KMW6S15vzd71
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
