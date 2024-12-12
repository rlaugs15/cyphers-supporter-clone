import { ICharacterComment } from "@/api/cyphersApi";

//캐릭터 댓글
export const characterComments: ICharacterComment[] = [
  ...Array.from({ length: 40 }, (_, index) => ({
    characterId: "c603a74ba02374026a535dc53e5b8d40",
    userId: `loginId${index + 1}`,
    userNickname: `울라리${index + 1}`,
    comment: `로라스 2차는 별로인듯?${index + 1}${index + 1}${index + 1}`,
  })),
  {
    characterId: "d69971a6762d94340bb2332e8735238a",
    userId: "loginId1",
    userNickname: "울라리",
    comment: "휴톤 2차는 별로인듯?",
  },
  {
    characterId: "4ff1922f862cae2cc98a6d498e76ef2b",
    userId: "loginId1",
    userNickname: "울라리",
    comment: "루이스2차 언제 나옴",
  },
  {
    characterId: "cc357fcea986318e6f6b4fe4501f4a1f",
    userId: "loginId1",
    userNickname: "울라리",
    comment: "타라 2차 성공적",
  },
];
