import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PlayerInfo } from "./api/cyphersApi";

//웹페이지 첫 방문 시 공지사항 출력
const { persistAtom: noticePersistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const noticeStateAtom = atom({
  key: "noticeState",
  default: true,
  effects_UNSTABLE: [noticePersistAtom],
});

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

//검색기록
export interface ISearchHistory {
  firstName: string;
  fullName: string;
}
const { persistAtom: persistSearchHistoryAtom } = recoilPersist({
  key: "persist-atom-key",
  storage: localStorage,
});

export const searchHistory = atom<ISearchHistory[]>({
  key: "searchHistorykey",
  default: [],
  effects_UNSTABLE: [persistSearchHistoryAtom],
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

//itemDetail 화면 on, off 전달
export const itemDetailScreenAtom = atom({
  key: "itemDetailScreen",
  default: false,
});

//아이템 id
export const itemIdAtom = atom({
  key: "itemId",
  default: "",
});

//캐릭터 id
export const characterIdAtom = atom({
  key: "characterId",
  default: "",
});

//캐릭터 총 인구수
export const characterLenthAtom = atom({
  key: "characterLenth",
  default: 0,
});

//뽑아내야할 데이터
export interface IWinAndPickStat {
  characterId: string;
  characterName: string;
  winRate?: number;
  pickRate?: number;
}

export const charWindAndPickAtom = atom<IWinAndPickStat[]>({
  key: "charWindAndPick",
  default: [],
});

//캐릭터 즐겨찾기
export interface IChampBookmark {
  characterId: string;
  characterName: string;
}
const { persistAtom: persistChampBookmarkAtom } = recoilPersist({
  key: "champBookmark-persist-atom-key",
  storage: localStorage,
});

export const champBookmarkAtom = atom<IChampBookmark[]>({
  key: "champBookmarkKey",
  default: [],
  effects_UNSTABLE: [persistChampBookmarkAtom],
});
