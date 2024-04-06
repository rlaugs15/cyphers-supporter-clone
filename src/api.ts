import axios from "axios";

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
