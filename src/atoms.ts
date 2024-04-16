import { atom } from "recoil";
import { PlayerInfo } from "./api";

export const playerIdAtom = atom({
  key: "playerId",
  default: "",
});

export const playerInfoAtom = atom({
  key: "playerInfo",
  default: null as PlayerInfo | null,
});

export const matshingLoadingAtom = atom({
  key: "matshingLoading",
  default: false,
});
//매칭 시리즈

export const normalMatchingAtom = atom<PlayerInfo | null>({
  key: "normalMatching",
  default: null,
});
export const normalMatshingLoadingAtom = atom({
  key: "normalMatshingLoading",
  default: false,
});

export const ratingMatchingAtom = atom<PlayerInfo | null>({
  key: "ratingMatching",
  default: null,
});
export const ratingMatshingLoadingAtom = atom({
  key: "ratingMatshingLoading",
  default: false,
});

export const allMatchingAtom = atom<PlayerInfo | null>({
  key: "allMatching",
  default: null,
});
export const allMatshingLoadingAtom = atom({
  key: "allMatshingLoading",
  default: false,
});
