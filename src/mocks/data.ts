import { ICharacterComment, User } from "../api";

//유저 데이터
export const users: User[] = [
  {
    loginId: "loginId1",
    nickname: "울라리",
    password: "rlaguswns123!!",
    name: "김현준",
    gender: "male",
    birthDay: "1994-02-16",
    email: "rlaugs15@gmail.com",
    createdAt: "2024-01-02",
  },
  {
    loginId: "loginId2",
    nickname: "히리",
    password: "rlaguswns123!!",
    name: "방민아",
    gender: "female",
    birthDay: "1993-05-13",
    email: "rlaugs44@gmail.com",
    createdAt: "2024-02-03",
  },
];

//캐릭터 댓글
export const characterComments: ICharacterComment[] = [
  {
    characterId: "c603a74ba02374026a535dc53e5b8d40",
    userId: "loginId1",
    userNickname: "울라리",
    comment: "로라스 2차는 별로인듯?",
  },
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
