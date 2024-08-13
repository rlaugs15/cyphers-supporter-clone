import { BoardComment, ICharacterComment, Post, User } from "../api";

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

//게시글 댓글
export const boardComments: BoardComment[] = [
  {
    id: 1,
    parentCommentId: null,
    childrenCommentsIds: [2, 3],
    content: "첫 번째 게시글의 첫 번째 댓글",
    userId: "loginId1",
    userNickname: "울라리",
    createdAt: "2024-01-01 10:30:00",
  },
  {
    id: 2,
    parentCommentId: 1,
    childrenCommentsIds: [],
    content: "첫 번째 게시글의 두 번째 댓글",
    userId: "loginId2",
    userNickname: "방민아",
    createdAt: "2024-01-02 11:15:00",
  },
  {
    id: 3,
    parentCommentId: 1,
    childrenCommentsIds: [4],
    content: "첫 번째 게시글의 세 번째 댓글",
    userId: "loginId3",
    userNickname: "달콤한펭귄",
    createdAt: "2024-01-03 12:00:00",
  },
  {
    id: 4,
    parentCommentId: 3,
    childrenCommentsIds: [],
    content: "첫 번째 게시글의 네 번째 댓글",
    userId: "loginId4",
    userNickname: "행복한고양이",
    createdAt: "2024-01-04 13:45:00",
  },
  {
    id: 5,
    parentCommentId: null,
    childrenCommentsIds: [],
    content: "첫 번째 게시글의 다섯 번째 댓글",
    userId: "loginId5",
    userNickname: "용감한독수리",
    createdAt: "2024-01-05 14:30:00",
  },
  {
    id: 6,
    parentCommentId: null,
    childrenCommentsIds: [],
    content: "두 번째 게시글의 첫 번째 댓글",
    userId: "loginId6",
    userNickname: "신나는돌고래",
    createdAt: "2024-01-06 09:00:00",
  },
  {
    id: 7,
    parentCommentId: null,
    childrenCommentsIds: [],
    content: "두 번째 게시글의 두 번째 댓글",
    userId: "loginId7",
    userNickname: "웃음가득호랑이",
    createdAt: "2024-01-07 10:15:00",
  },
  {
    id: 8,
    parentCommentId: null,
    childrenCommentsIds: [],
    content: "두 번째 게시글의 세 번째 댓글",
    userId: "loginId8",
    userNickname: "호기심많은너구리",
    createdAt: "2024-01-08 11:30:00",
  },
  {
    id: 9,
    parentCommentId: null,
    childrenCommentsIds: [],
    content: "두 번째 게시글의 네 번째 댓글",
    userId: "loginId9",
    userNickname: "열정적인사자",
    createdAt: "2024-01-09 12:45:00",
  },
  {
    id: 10,
    parentCommentId: null,
    childrenCommentsIds: [],
    content: "두 번째 게시글의 다섯 번째 댓글",
    userId: "loginId10",
    userNickname: "행운의토끼",
    createdAt: "2024-01-10 13:00:00",
  },
];

// 게시글 데이터
export const posts: Post[] = [
  {
    id: 650857,
    title: "첫 번째 게시글",
    content: "대충 게시글 내용1",
    author: "Bam",
    createdAt: "2024-03-21 18:13",
    updatedAt: "2024-03-21 18:13",
    comments: [1, 2, 3, 4, 5],
  },
  {
    id: 650856,
    title: "두 번째 게시글",
    content: "대충 게시글 내용2",
    author: "김철수",
    createdAt: "2024-05-20 18:13",
    updatedAt: "2024-05-20 18:13",
    comments: [6, 7, 8, 9, 10],
  },
  {
    id: 650855,
    title: "세 번째 게시글",
    content: "대충 게시글 내용3",
    author: "이영희",
    createdAt: "2024-06-15 18:13",
    updatedAt: "2024-06-15 18:13",
    comments: [],
  },
  {
    id: 650854,
    title: "네 번째 게시글",
    content: "대충 게시글 내용4",
    author: "박영수",
    createdAt: "2024-06-20 10:00",
    updatedAt: "2024-06-20 10:00",
    comments: [],
  },
  {
    id: 650853,
    title: "다섯 번째 게시글",
    content: "대충 게시글 내용5",
    author: "최민수",
    createdAt: "2024-06-21 11:00",
    updatedAt: "2024-06-21 11:00",
    comments: [],
  },
  {
    id: 650852,
    title: "여섯 번째 게시글",
    content: "대충 게시글 내용6",
    author: "유지현",
    createdAt: "2024-06-22 12:00",
    updatedAt: "2024-06-22 12:00",
    comments: [],
  },
  {
    id: 650851,
    title: "일곱 번째 게시글",
    content: "대충 게시글 내용7",
    author: "임지혜",
    createdAt: "2024-06-23 13:00",
    updatedAt: "2024-06-23 13:00",
    comments: [],
  },
  {
    id: 650850,
    title: "여덟 번째 게시글",
    content: "대충 게시글 내용8",
    author: "김진우",
    createdAt: "2024-06-24 14:00",
    updatedAt: "2024-06-24 14:00",
    comments: [],
  },
  {
    id: 650849,
    title: "아홉 번째 게시글",
    content: "대충 게시글 내용9",
    author: "신미정",
    createdAt: "2024-06-25 15:00",
    updatedAt: "2024-06-25 15:00",
    comments: [],
  },
  {
    id: 650848,
    title: "열 번째 게시글",
    content: "대충 게시글 내용10",
    author: "강민호",
    createdAt: "2024-06-26 16:00",
    updatedAt: "2024-06-26 16:00",
    comments: [],
  },
  {
    id: 650847,
    title: "열한 번째 게시글",
    content: "대충 게시글 내용11",
    author: "오수진",
    createdAt: "2024-06-27 17:00",
    updatedAt: "2024-06-27 17:00",
    comments: [],
  },
  {
    id: 650846,
    title: "열두 번째 게시글",
    content: "대충 게시글 내용12",
    author: "정민경",
    createdAt: "2024-06-28 18:00",
    updatedAt: "2024-06-28 18:00",
    comments: [],
  },
  {
    id: 650845,
    title: "열세 번째 게시글",
    content: "대충 게시글 내용13",
    author: "김수현",
    createdAt: "2024-06-29 19:00",
    updatedAt: "2024-06-29 19:00",
    comments: [],
  },
  {
    id: 650844,
    title: "열네 번째 게시글",
    content: "대충 게시글 내용14",
    author: "최지훈",
    createdAt: "2024-06-30 20:00",
    updatedAt: "2024-06-30 20:00",
    comments: [],
  },
  {
    id: 650843,
    title: "열다섯 번째 게시글",
    content: "대충 게시글 내용15",
    author: "이민재",
    createdAt: "2024-07-01 21:00",
    updatedAt: "2024-07-01 21:00",
    comments: [],
  },
  {
    id: 650842,
    title: "열여섯 번째 게시글",
    content: "대충 게시글 내용16",
    author: "박지수",
    createdAt: "2024-07-02 22:00",
    updatedAt: "2024-07-02 22:00",
    comments: [],
  },
  {
    id: 650832,
    title: "열일곱 번째 게시글",
    content: "대충 게시글 내용17",
    author: "김현우",
    createdAt: "2024-07-03 23:00",
    updatedAt: "2024-07-03 23:00",
    comments: [],
  },
  {
    id: 650840,
    title: "열여덟 번째 게시글",
    content: "대충 게시글 내용18",
    author: "윤정희",
    createdAt: "2024-07-04 00:00",
    updatedAt: "2024-07-04 00:00",
    comments: [],
  },
  {
    id: 650839,
    title: "열아홉 번째 게시글",
    content: "대충 게시글 내용19",
    author: "이승민",
    createdAt: "2024-07-05 01:00",
    updatedAt: "2024-07-05 01:00",
    comments: [],
  },
  {
    id: 650838,
    title: "스무 번째 게시글",
    content: "대충 게시글 내용20",
    author: "전지현",
    createdAt: "2024-07-06 02:00",
    updatedAt: "2024-07-06 02:00",
    comments: [],
  },
  {
    id: 650837,
    title: "스물한 번째 게시글",
    content: "대충 게시글 내용21",
    author: "한지민",
    createdAt: "2024-07-07 03:00",
    updatedAt: "2024-07-07 03:00",
    comments: [],
  },
  {
    id: 650836,
    title: "스물두 번째 게시글",
    content: "대충 게시글 내용22",
    author: "유아인",
    createdAt: "2024-07-08 04:00",
    updatedAt: "2024-07-08 04:00",
    comments: [],
  },
  {
    id: 650835,
    title: "스물세 번째 게시글",
    content: "대충 게시글 내용23",
    author: "김태희",
    createdAt: "2024-07-09 05:00",
    updatedAt: "2024-07-09 05:00",
    comments: [],
  },
  {
    id: 650834,
    title: "스물네 번째 게시글",
    content: "대충 게시글 내용24",
    author: "조인성",
    createdAt: "2024-07-10 06:00",
    updatedAt: "2024-07-10 06:00",
    comments: [],
  },
  {
    id: 650833,
    title: "스물다섯 번째 게시글",
    content: "대충 게시글 내용25",
    author: "송중기",
    createdAt: "2024-07-11 07:00",
    updatedAt: "2024-07-11 07:00",
    comments: [],
  },
];
