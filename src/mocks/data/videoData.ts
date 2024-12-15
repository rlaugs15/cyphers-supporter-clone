import { Video } from "@/api/videoApi";

export const videos: Video[] = [
  {
    id: 1,
    authorId: "loginId1",
    url: "/videos/qwer_TBH.mp4",
    title: "아파트",
    author: "울라리",
    views: 12,
    uploadedAt: new Date("2024-02-10"),
  },
  {
    id: 2,
    authorId: "loginId2",
    url: "/videos/ArianaGrande_LastChristmas.mp4",
    title: "아파트",
    author: "히리",
    views: 13,
    uploadedAt: new Date("2024-12-01"),
  },
  {
    id: 3,
    authorId: "loginId3",
    url: "/videos/IU_Palette.mp4",
    title: "IU - 팔레트",
    author: "달콤한펭귄",
    views: 11,
    uploadedAt: new Date("2024-05-10"),
  },
  {
    id: 4,
    authorId: "loginId4",
    url: "/videos/ROSEBrunoMars_APT.mp4",
    title: "라스트크리스마스",
    author: "별빛소녀",
    views: 23,
    uploadedAt: new Date("2024-07-10"),
  },
];
