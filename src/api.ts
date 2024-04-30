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
    mapId: string;
    name: string;
  };
  playInfo: {
    partyDisplay: string;
    result: string;
    random: boolean;
    partyUserCount: number;
    partyInfo: partyInfo[];
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

interface Item {
  itemId: string; // 아이템의 고유 식별자
  itemName: string; // 아이템 이름 (예: "E 섬섬옥수")
  slotCode: string; // 슬롯 코드 (예: "101")
  slotName: string; // 슬롯 이름 (예: "손(공격)")
  rarityCode: string; // 희귀도 코드 (예: "104")
  rarityName: string; // 희귀도 이름 (예: "유니크")
  equipSlotCode: string; // 장비 슬롯 코드 (예: "101")
  equipSlotName: string; // 장비 슬롯 이름 (예: "손(공격)")
}

interface Attribute {
  level: number; // 레벨
  id: string; // 속성의 고유 식별자
  name: string; // 속성 이름 (예: "사격술")
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
    mapId: string;
    name: string;
  };
  playInfo: DetailPlayerInfo;
  position: {
    name: string; // 직책 이름 (예: "원거리딜러")
    explain: string; // 설명 (예: "치명타 피해량 +12%")
    attribute: Attribute[]; // 속성 배열
  };
  items: Item[];
}

interface Team {
  result: "win" | "lose";
  players: string[];
}

export interface DetailMatchData {
  date: string;
  gameTypeId: string;
  map: {
    mapId: string;
    name: string;
  };
  teams: Team[];
  players: DetailPlayer[];
}

//https://api.neople.co.kr/cy/matches/5eea183c92e5f6efc4ef64a45c335908cdb1f8b1802218ad84de1c42b9ad29cc?&apikey=AR5FRcTpheYlQiA8tMc3KMW6S15vzd71
export async function getDetailMatching(matchId: string) {
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/matches/${matchId}?apikey=${API_KEY}`
  );
  return response.data;
}
