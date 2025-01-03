import { http, HttpResponse, passthrough } from "msw";
import { SignJWT, jwtVerify } from "jose";
import { logout } from "../tokenInstance";
import { CustomDateFormatter } from "../libs/utils";
import { IChangPass, User } from "../api/userApi";
import { IBoardComment, ILike, Post } from "../api/boardApi";
import { ICharacterComment } from "../api/cyphersApi";
import { users } from "./data/userData";
import { characterComments } from "./data/cyphersData";
import { boardComments, boardLikes, posts } from "./data/boardData";
import { videoComments, videoReplyComments, videos } from "./data/videoData";
import { VideoComment, VideoReplyComment } from "@/api/videoApi";

const secretKey = new TextEncoder().encode("your-secret-key");

// JWT 생성 함수
const generateToken = async (user: User): Promise<string> => {
  const payload = {
    userId: user.loginId,
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("1h")
    .sign(secretKey);
};

// JWT 검증 및 디코딩 함수
const verifyAndDecodeToken = async (token: string): Promise<any> => {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });
    return payload;
  } catch (e) {
    console.error("Token verification failed:", e);
    return null;
  }
};

// 쿠키 파싱 유틸리티 함수
const parseCookies = (cookieHeader: string): { [key: string]: string } => {
  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as { [key: string]: string });
};

//랜덤 비밀번호 생성 함수
function createRandomPassword() {
  const length = Math.floor(Math.random() * (20 - 8 + 1)) + 8; // 8~20 사이의 랜덤 길이
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialCharacters = "@$!%*#?&";

  const getRandomChar = (characters: string | any[]) =>
    characters[Math.floor(Math.random() * characters.length)];

  let password = "";
  password += getRandomChar(alphabet);
  password += getRandomChar(digits);
  password += getRandomChar(specialCharacters);

  while (password.length < length) {
    const allCharacters = alphabet + digits + specialCharacters;
    password += getRandomChar(allCharacters);
  }

  // 랜덤으로 섞기
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}

export const handlers = [
  // Access Token 재발급 요청
  http.post("/auth/reissue-token", async ({ request }) => {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cookies = parseCookies(cookieHeader);
    const refreshToken = cookies["refreshToken"];
    if (!refreshToken) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const { payload } = await jwtVerify(refreshToken, secretKey, {
        issuer: "urn:example:issuer",
        audience: "urn:example:audience",
      });
      if (payload.exp! <= Math.floor(Date.now() / 1000)) {
        throw new Error("Token expired");
      }

      const user = users.find((u) => u.loginId === payload.userId);
      if (!user) {
        throw new Error("User not found");
      }

      const newAccessToken = await generateToken(user);
      return HttpResponse.json({ newToken: newAccessToken }, { status: 200 });
    } catch (e) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }),

  //---------------------GET 요청---------------------------

  // 회원 정보 조회
  http.get("/api/v1/member", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return HttpResponse.json(
        { code: 401, message: "Unauthorized", data: null },
        { status: 401 }
      );
    }

    const decoded = await verifyAndDecodeToken(token);
    if (!decoded) {
      return HttpResponse.json(
        { code: 401, message: "Unauthorized", data: null },
        { status: 401 }
      );
    }

    // 토큰이 유효한 경우 사용자 데이터 반환
    const user = users.find((u) => u.loginId === decoded.userId);

    if (!user) {
      return HttpResponse.json(
        { code: 404, message: "User not found", data: null },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "Member information retrieved successfully",
        data: {
          id: user.loginId, // Assuming `loginId` is the user's ID
          avatar: user?.avatar,
          email: user.email,
          nickname: user.nickname,
          profileImg: null,
          createdAt: null,
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),

  // 로그인id 중복확인 GET 요청
  http.get("/api/v1/auth/check-loginid/:loginId", ({ params }) => {
    const { loginId } = params;
    const user = users.find((user) => user.loginId === loginId);
    console.log("user", user);

    if (user) {
      return HttpResponse.json(
        { code: 409, message: "존재하는 로그인ID입니다." },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { code: 200, message: "사용할 수 있는 로그인ID입니다." },
      { status: 200 }
    );
  }),

  // 닉네임 중복확인 GET 요청
  http.get("/api/v1/auth/check-nickname/:nickname", ({ params }) => {
    const { nickname } = params;
    const user = users.find((user) => user.nickname === nickname);

    if (user) {
      return HttpResponse.json(
        { code: 409, message: "존재하는 닉네임입니다." },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { code: 200, message: "사용할 수 있는 닉네임입니다." },
      { status: 200 }
    );
  }),

  // 이메일 중복확인 GET 요청
  http.get("/api/v1/auth/check-email/:email", ({ params }) => {
    const { email } = params;
    const user = users.find((user) => user.email === email);

    if (user) {
      return HttpResponse.json(
        { code: 409, message: "존재하는 이메일입니다." },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      { code: 200, message: "사용할 수 있는 이메일입니다." },
      { status: 200 }
    );
  }),

  // 캐릭터 댓글 GET 요청
  http.get("/api/v1/character/comment/:characterId", ({ params }) => {
    const { characterId } = params;
    const characterComment = characterComments
      .filter((character) => character.characterId === characterId)
      .slice(0, 4);

    if (!characterComment) {
      return HttpResponse.json(
        { code: 409, message: "댓글을 조회할 수 없습니다." },
        { status: 409 }
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "댓글 조회에 성공했습니다.",
        data: characterComment,
      },
      { status: 200 }
    );
  }),

  // 캐릭터 댓글 GET 요청 (무한 스크롤)
  http.get(
    "/api/v1/character/comment/infinite/:characterId",
    ({ params, request }) => {
      const { characterId } = params;
      const url = new URL(request.url);

      const page = parseInt(url.searchParams.get("page") || "0");
      const size = parseInt(url.searchParams.get("size") || "10");
      const start = page * size;
      const end = start + size;

      const filteredComments = characterComments
        .filter((comment) => comment.characterId === characterId)
        .slice(start, end);

      return HttpResponse.json(
        {
          code: 200,
          message: "데이터 조회 성공",
          data: filteredComments,
        },
        { status: 200 }
      );
    }
  ),

  // 게시글 목록 GET 요청
  http.get("/api/v1/board", ({ request }) => {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get("page") || "0");
    const size = parseInt(url.searchParams.get("size") || "10");
    const start = page * size;
    const end = start + size;

    const paginatedPosts = posts.slice(start, end);

    return HttpResponse.json(
      {
        code: 200,
        message: "데이터 조회 성공",
        data: {
          posts: paginatedPosts,
          totalElements: posts.length,
          totalPages: Math.ceil(posts.length / size),
          currentPage: page,
        },
      },
      { status: 200 }
    );
  }),

  //게시글 상세 GET 요청
  http.get("/api/v1/board/:id", ({ params }) => {
    const { id } = params;
    const post = posts.find((post) => Number(id) === post?.id);
    if (!post) {
      return HttpResponse.json(
        {
          code: 404,
          message: "게시글을 조회할 수 없습니다.",
          data: post,
        },
        { status: 404 }
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "게시글 조회 성공",
        data: post,
      },
      { status: 200 }
    );
  }),

  //게시글 댓글 GET 요청
  http.get("/api/v1/comments/:id", ({ params }) => {
    const { id } = params;
    const post = posts.find((post) => Number(id) === post?.id);
    if (!post) {
      return HttpResponse.json(
        {
          code: 404,
          message: "데이터 조회 실패",
        },
        { status: 404 }
      );
    }

    const commentIdList = post?.comments?.map((item) => item);
    const comments = boardComments.filter((comment) =>
      commentIdList?.includes(comment.id)
    );

    return HttpResponse.json(
      {
        code: 200,
        message: "데이터 조회 성공",
        data: comments,
      },
      { status: 200 }
    );
  }),

  //게시글 좋아요 GET 요청
  http.get("/api/v1/board/like/:boardId", ({ params, request }) => {
    const { boardId } = params;

    //해당 사용자가 좋아요를 했는지 여부 추가할 시 로직 짜기
    const url = new URL(request.url);
    const loginId = url.searchParams.get("loginId");

    if (!loginId) {
      return HttpResponse.json(
        {
          code: 400,
          message: "loginId가 제공되지 않았습니다.",
        },
        { status: 400 }
      );
    }

    const targetBoard = posts.find((board) => board.id === Number(boardId));
    if (!targetBoard) {
      return HttpResponse.json(
        {
          code: 404,
          message: "해당 게시글이 존재하지 않습니다.",
        },
        { status: 404 }
      );
    }

    // 좋아요 필터링
    const filterLikes = boardLikes.filter(
      (boardLike) => boardLike.boardId === Number(boardId)
    );

    // 해당 사용자가 좋아요를 눌렀는지 여부 확인
    const onLike = filterLikes.some((like) => like.loginId === loginId);
    const likeResult = Boolean(onLike);

    return HttpResponse.json(
      {
        code: 200,
        message: "데이터 조회 성공",
        data: {
          likesLength: filterLikes.length,
          onLike: likeResult,
        },
      },
      { status: 200 }
    );
  }),

  //비디오 목록 get 요청
  http.get("/api/v1/video", () => {
    const videoList = videos;

    if (!videoList) {
      return HttpResponse.json(
        {
          code: 404,
          message: "데이터 조회 실패",
          data: null,
        },
        { status: 404 }
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "데이터 조회 성공",
        data: videoList,
      },
      { status: 200 }
    );
  }),
  //비디오 get 요청
  // (1) 기존 메타데이터 API
  http.get("/api/v1/video/:videoId", ({ params }) => {
    const { videoId } = params;

    const findVideo = videos.find((video) => video.id === Number(videoId));

    if (!findVideo) {
      return HttpResponse.json(
        {
          code: 404,
          message: "데이터 조회 실패",
          data: null,
        },
        { status: 404 }
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "데이터 조회 성공",
        data: findVideo,
      },
      { status: 200 }
    );
  }),

  // 모든 비디오 파일 요청을 passthrough
  http.get("/.*.mp4$/", ({ request }) => {
    return passthrough();
  }),

  //비디오 댓글 get 요청
  http.get("/api/v1/video/:videoId/comments", ({ params }) => {
    const { videoId } = params;

    const findVideo = videos.find((video) => video.id === Number(videoId));
    if (!findVideo) {
      return HttpResponse.json(
        {
          code: 404,
          message: "영상이 존재하지 않습니다.",
          data: null,
        },
        { status: 404 }
      );
    }

    const findComments = videoComments.filter(
      (comment) => comment.videoId === Number(videoId)
    );

    if (!findComments) {
      return HttpResponse.json(
        {
          code: 404,
          message: "댓글 목록이 존재하지 않습니다.",
          data: null,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "댓글 목록 조회 성공",
        data: findComments,
      },
      { status: 200 }
    );
  }),

  //비디오 대댓글 get 요청
  http.get(
    "/api/v1/video/:videoId/comments/:parentCommId/reply",
    ({ params }) => {
      const { videoId, parentCommId } = params;

      const findVideo = videos.find((video) => video.id === Number(videoId));
      if (!findVideo) {
        return HttpResponse.json(
          {
            code: 404,
            message: "영상이 존재하지 않습니다.",
            data: null,
          },
          { status: 404 }
        );
      }

      const findParentComm = videoComments.find(
        (comm) => comm.id === Number(parentCommId)
      );
      if (!findParentComm) {
        return HttpResponse.json(
          {
            code: 404,
            message: "댓글이 존재하지 않습니다.",
            data: null,
          },
          { status: 404 }
        );
      }

      const replyCommIdList = findParentComm.replies;
      const filterReplyComm = videoReplyComments.filter((comm) =>
        replyCommIdList.includes(comm.id)
      );
      if (!filterReplyComm) {
        return HttpResponse.json(
          {
            code: 404,
            message: "대댓글이 존재하지 않습니다.",
            data: null,
          },
          { status: 404 }
        );
      }

      return HttpResponse.json(
        {
          code: 200,
          message: "댓글 목록 조회 성공",
          data: filterReplyComm,
        },
        { status: 200 }
      );
    }
  ),

  //---------------------POST 요청-------------------------------

  // 회원가입 요청
  http.post("/api/v1/join", async ({ request }) => {
    const currentDate = new Date();
    // 연도를 가져오고 문자열로 변환
    const year = currentDate.getFullYear().toString();
    // 월을 가져오고, JavaScript의 월은 0부터 시작하므로 1을 더한 후 문자열로 변환
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    // 일을 가져오고 문자열로 변환
    const day = currentDate.getDate().toString().padStart(2, "0");
    // 형식화된 문자열 생성
    const formattedDate = `${year}-${month}-${day}`;

    const formData = await request.formData();

    const loginId = formData.get("loginId") as string;
    const email = formData.get("email") as string;
    const gender = formData.get("gender") as string;
    const birthDay = formData.get("birthDay") as string;
    const name = formData.get("name") as string;
    const nickname = formData.get("nickname") as string;
    const password = formData.get("password") as string;
    const avatar = formData.get("avatar") as File | null;

    if (avatar) {
      const url = URL.createObjectURL(avatar); // 메모리 내 URL 생성
      users.push({
        loginId,
        email,
        gender,
        birthDay,
        name,
        nickname,
        password,
        createdAt: formattedDate,
        avatar: url,
      });
    } else {
      users.push({
        loginId,
        email,
        gender,
        birthDay,
        name,
        nickname,
        password,
        createdAt: formattedDate,
      });
    }

    const joinResult = users.find((user) => user.loginId === loginId);
    if (!joinResult) {
      return HttpResponse.json(
        { code: 500, message: "회원가입 실패" },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { code: 200, message: "회원가입 성공" },
      { status: 200 }
    );
  }),

  // 로그인 요청
  http.post("/api/v1/login", async ({ request }) => {
    const { loginId, password } = (await request.json()) as Pick<
      User,
      "loginId" | "password"
    >;

    const idCeck = users.find((user) => user.loginId === loginId);

    if (!idCeck) {
      return HttpResponse.json(
        {
          code: 400,
          message: "아이디가 일치하지 않습니다.",
          data: null,
        },
        { status: 200 }
      );
    }
    const pwCeck = users.find((user) => user.password === password);
    if (!pwCeck) {
      return HttpResponse.json(
        {
          code: 400,
          message: "비밀번호가 일치하지 않습니다.",
          data: null,
        },
        { status: 200 }
      );
    }
    const user = idCeck;
    // Access Token 생성
    const token = await generateToken(user);
    // Refresh Token은 여기에서는 단순히 응답의 쿠키로 설정, 실제 환경에서는 서버에서 관리
    const refreshToken = await new SignJWT({ userId: user.loginId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secretKey);

    return HttpResponse.json(
      { code: 200, message: "성공", data: { token } },
      {
        status: 200,
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly`,
        },
      }
    );
  }),

  // 로그아웃 요청
  http.post("/api/v1/logout", async ({}) => {
    logout();
    return HttpResponse.json({ code: 200 }, { status: 200 });
  }),

  //캐릭터 댓글작성 요청
  http.post(
    "/api/v1/character/comment/:characterId",
    async ({ request, params }) => {
      const { characterId } = params as Pick<ICharacterComment, "characterId">;
      const { userId, userNickname, comment } =
        (await request.json()) as ICharacterComment;
      if (!characterId) {
        return HttpResponse.json(
          { code: 400, message: " 서버가 요청을 처리하지 못 했습니다." },
          { status: 400 }
        );
      }
      characterComments.unshift({
        characterId,
        userId,
        userNickname,
        comment,
      });
      return HttpResponse.json(
        { code: 200, message: "댓글작성에 성공했습니다." },
        { status: 200 }
      );
    }
  ),

  //게시글 작성
  http.post("/api/v1/board", async ({ request }) => {
    const { title, content, author, userAvatar } =
      (await request.json()) as Pick<
        Post,
        "title" | "content" | "author" | "userAvatar"
      >;
    if (!title || !content || !author) {
      return HttpResponse.json(
        { code: 500, message: "게시글 작성에 실패했습니다." },
        { status: 500 }
      );
    }

    const id = Math.floor(100000 + Math.random() * 900000);
    const createdAt = new CustomDateFormatter().getFormattedCurrentTime();

    posts.unshift({
      id,
      title,
      content,
      author,
      userAvatar,
      like: 0,
      createdAt,
      updatedAt: "",
      comments: [],
    });

    return HttpResponse.json(
      {
        code: 200,
        message: "게시글 작성에 성공했습니다.",
      },
      { status: 200 }
    );
  }),

  //게시판 댓글 작성
  http.post("/api/v1/board/comments/:boardId", async ({ request, params }) => {
    const { boardId } = params;

    const { userId, userAvatar, userNickname, content } =
      (await request.json()) as Pick<
        IBoardComment,
        "userId" | "userAvatar" | "userNickname" | "content"
      >;

    const targetBoard = posts.find((board) => board.id === Number(boardId));

    if (!targetBoard) {
      return HttpResponse.json(
        {
          code: 404,
          message: "해당 게시글 존재하지 않습니다.",
        },
        { status: 404 }
      );
    }

    const createdAt = new CustomDateFormatter().getFormattedCurrentTime();
    const commentId = Date.now();

    targetBoard.comments?.push(commentId);

    if (userAvatar) {
      /* const avatarUrl = URL.createObjectURL(avatar);
      console.log("avatarUrl", avatarUrl); */

      boardComments.push({
        id: commentId,
        parentCommentId: null,
        childrenCommentsIds: [],
        content,
        userId,
        userAvatar,
        userNickname,
        createdAt: createdAt,
      });
    } else {
      boardComments.push({
        id: commentId,
        parentCommentId: null,
        childrenCommentsIds: [],
        content,
        userId,
        userNickname,
        createdAt: createdAt,
      });
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "댓글 작성에 성공했습니다.",
      },
      { status: 200 }
    );
  }),

  //게시판 대댓글 작성
  http.post(
    "/api/v1/board/comments/reply/:boardId",
    async ({ request, params }) => {
      const { boardId } = params;

      const { userId, parentCommentId, userAvatar, userNickname, content } =
        (await request.json()) as Pick<
          IBoardComment,
          | "userId"
          | "userAvatar"
          | "userNickname"
          | "content"
          | "parentCommentId"
        >;

      const targetBoard = posts.find((board) => board.id === +boardId);
      if (!targetBoard) {
        return HttpResponse.json(
          {
            code: 404,
            message: "해당 게시글이 존재하지 않습니다.",
          },
          { status: 404 }
        );
      }

      const targetParent = boardComments.find(
        (comment) => comment.id === Number(parentCommentId)
      );
      if (!targetParent) {
        return HttpResponse.json(
          {
            code: 404,
            message: "해당 부모 댓글이 존재하지 않습니다.",
          },
          { status: 404 }
        );
      }

      const createdAt = new CustomDateFormatter().getFormattedCurrentTime();

      const commentId = Date.now();

      targetBoard.comments?.push(commentId);
      targetParent.childrenCommentsIds?.push(commentId);

      const newChild: IBoardComment = {
        id: commentId,
        parentCommentId: +parentCommentId!,
        childrenCommentsIds: [],
        content,
        userId: String(userId),
        userAvatar: userAvatar! ?? null,
        userNickname: String(userNickname),
        createdAt,
      };
      boardComments.push(newChild);

      return HttpResponse.json(
        {
          code: 200,
          message: "댓글 작성에 성공했습니다.",
        },
        { status: 200 }
      );
    }
  ),

  //로그안ID 찾기
  http.post("/api/v1/auth/find-loginid", async ({ request }) => {
    const { email, name, gender, birthDay } = (await request.json()) as Pick<
      User,
      "email" | "name" | "gender" | "birthDay"
    >;
    const findData = users.find(
      (user) =>
        user.email === email &&
        user.name === name &&
        user.gender === gender &&
        user.birthDay === birthDay
    );

    if (!findData) {
      return HttpResponse.json(
        {
          code: 404,
          message: "입력된 정보를 다시 확인해주세요.",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "로그인ID를 성공적으로 찾았습니다.",
        data: {
          loginId: findData.loginId,
        },
      },
      { status: 200 }
    );
  }),

  //임시 비밀번호 전송
  http.post("/api/v1/auth/send-temporary-password", async ({ request }) => {
    const { loginId, email } = (await request.json()) as Pick<
      User,
      "loginId" | "email"
    >;

    const findUser = users.find(
      (user) => user.loginId === loginId && user.email === email
    );

    if (!findUser) {
      return HttpResponse.json(
        {
          code: 404,
          message: "입력된 정보를 다시 확인해주세요.",
        },
        { status: 404 }
      );
    }

    const randomPassword = createRandomPassword();
    findUser.password = randomPassword;

    return HttpResponse.json(
      {
        code: 200,
        message: "로그인ID를 성공적으로 찾았습니다.",
        data: {
          password: randomPassword,
        },
      },
      { status: 200 }
    );
  }),

  //게시글 좋아요 요청
  http.post("/api/v1/board/like/:boardId", async ({ params, request }) => {
    const { boardId } = params;
    const { loginId } = (await request.json()) as Pick<User, "loginId">;

    const targetBoard = posts.find((board) => board.id === Number(boardId));
    if (!targetBoard) {
      return HttpResponse.json(
        {
          code: 404,
          message: "해당 게시글이 존재하지 않습니다.",
        },
        { status: 404 }
      );
    }

    const likeIndex = boardLikes.findIndex(
      (boardLike) =>
        boardLike.boardId === Number(boardId) && boardLike.loginId === loginId
    );
    if (likeIndex !== -1) {
      boardLikes.splice(likeIndex, 1);
      targetBoard.like -= 1;
    } else {
      const pushData: ILike = { boardId: +boardId, loginId };
      boardLikes.push(pushData);
      targetBoard.like += 1;
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "좋아요 요청에 성공했습니다.",
      },
      { status: 200 }
    );
  }),

  //---------------------PATCH 요청-------------------------------
  //게시글 수정 put 요청
  http.patch("/api/v1/board/:boardId", async ({ request, params }) => {
    const { boardId } = params;
    const { title, content } = (await request.json()) as Pick<
      Post,
      "title" | "content"
    >;

    const targetBoard = posts.find((board) => board.id === Number(boardId));
    if (!targetBoard) {
      return HttpResponse.json(
        { code: 404, message: "게시글을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const updatedAt = new CustomDateFormatter().getFormattedCurrentTime();
    targetBoard.updatedAt = updatedAt;
    targetBoard.title = title;
    targetBoard.content = content;

    return HttpResponse.json(
      { code: 200, message: "게시글 수정에 성공했습니다." },
      { status: 200 }
    );
  }),

  //---------------------PATCH 요청-------------------------------

  //회원 정보 수정 patch 요청
  http.patch("/api/v1/me", async ({ request }) => {
    const formData = await request.formData();

    const loginId = formData.get("loginId") as string;
    const nickname = formData.get("nickname") as string;
    const avatar = formData.get("avatar") as File | null;

    // 사용자 ID로 사용자 조회
    const checkId = users.find((user) => user.loginId === loginId);
    if (!checkId) {
      return HttpResponse.json(
        { code: 400, message: "id 조회에 실패했습니다." },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인
    const checkNickname = users.find((user) => user.nickname === nickname);
    const userLoginId = users.find((user) => user.loginId === loginId);
    if (checkNickname && userLoginId?.nickname !== nickname) {
      return HttpResponse.json(
        { code: 409, message: "존재하는 닉네임입니다." },
        { status: 409 }
      );
    }

    const targetUserIdx = users.findIndex((user) => user.loginId === loginId);
    users[targetUserIdx].nickname = nickname;
    // Mock 환경에서는 메모리 내에 파일을 저장

    if (avatar) {
      const avatarUrl = URL.createObjectURL(avatar); // 메모리 내 URL 생성
      users[targetUserIdx].avatar = avatarUrl;
      //작성한 게시글이 있을 경우
      const checkBoards = posts.filter((post) => post.author === nickname);
      if (checkBoards) {
        checkBoards.forEach((board) => (board.userAvatar = avatarUrl));
      }
      //작성한 댓글이 있을 경우
      const checkComments = boardComments.filter(
        (comment) => comment.userId === loginId
      );
      if (checkComments) {
        checkComments.forEach((comment) => (comment.userAvatar = avatarUrl));
      }
      //올린 영상이 있을 경우
      const checkVideos = videos.filter((video) => video.authorId === loginId);
      if (checkVideos) {
        checkVideos.forEach((video) => (video.authorAvatar = avatarUrl));
      }
      //영상에 댓글을 달았을 경우
      const checkVideoComments = videoComments.filter(
        (comment) => comment.authorId === loginId
      );
      if (checkVideoComments) {
        checkVideoComments.forEach(
          (comment) => (comment.authorAvatar = avatarUrl)
        );
      }

      //영상에 대댓글을 달았을 경우
      const checkVideoReplyCpmment = videoReplyComments.filter(
        (comm) => comm.authorId === loginId
      );
      if (checkVideoReplyCpmment) {
        checkVideoReplyCpmment.forEach(
          (comm) => (comm.authorAvatar = avatarUrl)
        );
      }
    }

    return HttpResponse.json(
      { code: 200, message: "회원정보 수정에 성공했습니다." },
      { status: 200 }
    );
  }),

  //비밀번호 변경 patch 요청
  http.patch("/api/v1/password", async ({ request }) => {
    const { loginId, currentPassword, newPassword } =
      (await request.json()) as IChangPass;

    const targetIndex = users.findIndex((user) => user.loginId === loginId);

    const checkCurrentPass = users[targetIndex].password !== currentPassword;
    if (checkCurrentPass) {
      return HttpResponse.json(
        { code: 401, message: "현재 비밀번호와 일치하지 않습니다." },
        { status: 401 }
      );
    }

    users[targetIndex].password = newPassword;
    return HttpResponse.json(
      { code: 200, message: "비밀번호 변경에 성공했습니다." },
      { status: 200 }
    );
  }),

  //영상 조회수 patch 요청
  http.patch("/api/v1/video/:videoId/views", async ({ params, request }) => {
    const { videoId } = params;
    const {} = (await request.json()) as any;

    const targetVideo = videos.find((video) => video.id === Number(videoId));

    if (!targetVideo) {
      return HttpResponse.json(
        { code: 404, message: "영상이 존재하지 않습니다." },
        { status: 404 }
      );
    }

    targetVideo.views += 1;
    return HttpResponse.json(
      { code: 200, message: "조회수가 올랐습니다." },
      { status: 200 }
    );
  }),

  //---------------------DELETE 요청-------------------------------

  //회원탈퇴 delete 요청
  http.delete("/api/v1/me", async ({ request }) => {
    const { loginId, password } = (await request.json()) as Pick<
      User,
      "loginId" | "password"
    >;

    const targetIndex = users.findIndex((user) => user.loginId === loginId);

    const checkUser = users[targetIndex].password === password;
    if (!checkUser) {
      return HttpResponse.json(
        { code: 401, message: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }
    return HttpResponse.json(
      { code: 200, message: "회원 탈퇴에 성공했습니다." },
      { status: 200 }
    );
  }),

  //게시글 삭제 delete 요청
  http.delete("/api/v1/board/:boardId", async ({ params }) => {
    const { boardId } = params;

    const targetBoardIndex = posts.findIndex(
      (board) => board.id === Number(boardId)
    );
    if (targetBoardIndex === -1) {
      return HttpResponse.json(
        { code: 404, message: "해당 게시글이 존재하지 않습니다." },
        { status: 404 }
      );
    }

    posts.splice(targetBoardIndex, 1);

    return HttpResponse.json(
      { code: 200, message: "게시글 삭제에 성공했습니다." },
      { status: 200 }
    );
  }),
  //게시글 댓글 삭제 delete 요청
  http.delete("/api/v1/comments/:commentId", async ({ request, params }) => {
    const { commentId } = params;

    const url = new URL(request.url);
    const boardId = url.searchParams.get("boardId");

    const targetBoard = posts.find((board) => board.id === Number(boardId));
    if (!targetBoard) {
      return HttpResponse.json(
        { code: 404, message: "해당 게시글이 존재하지 않습니다." },
        { status: 404 }
      );
    }

    //댓글 데이터에서 자식 댓글들이 존재한다면 삭제
    const targetComment = boardComments.find(
      (comment) => comment.id === +commentId
    );
    if (targetComment?.childrenCommentsIds?.length) {
      const childs = targetComment?.childrenCommentsIds;
      for (const commentIndex in boardComments) {
        if (childs.includes(boardComments[commentIndex].id)) {
          childs.splice(+commentIndex, 1);
        }
      }
    }
    //해당 게시판에서 댓글id 삭제
    const targetIndex = targetBoard.comments?.findIndex(
      (comment) => comment === +commentId
    );
    targetBoard.comments?.splice(targetIndex!, 1);

    //댓글 데이터에서 해당 댓글 삭제
    const commentIndex = boardComments.findIndex(
      (comment) => comment.id === +commentId
    );
    boardComments.splice(commentIndex, 1);

    return HttpResponse.json(
      { code: 200, message: "대댓글 삭제에 성공했습니다." },
      { status: 200 }
    );
  }),

  //게시글 대댓글 삭제 delete 요청
  http.delete(
    "/api/v1/comments/reply/:commentId",
    async ({ request, params }) => {
      const { commentId } = params;

      const url = new URL(request.url);
      const boardId = url.searchParams.get("boardId");
      const parentCommentId = url.searchParams.get("parentCommentId");

      const targetBoard = posts.find((board) => board.id === Number(boardId));
      if (!targetBoard) {
        return HttpResponse.json(
          { code: 404, message: "해당 게시글이 존재하지 않습니다." },
          { status: 404 }
        );
      }

      const targetParent = boardComments.find(
        (comment) => comment.id === Number(parentCommentId)
      );
      if (!targetParent) {
        return HttpResponse.json(
          { code: 404, message: "해당 부모 댓글이 존재하지 않습니다." },
          { status: 404 }
        );
      }

      //해당 게시판에서 댓글id 삭제
      const targetIndex = targetBoard?.comments?.findIndex(
        (comment) => comment === +commentId
      );
      targetBoard?.comments?.splice(targetIndex!, 1);

      //댓글 데이터에서 댓글 삭제
      const targetCommentIndex = boardComments.findIndex(
        (comment) => comment.id === +commentId
      );
      boardComments.splice(targetCommentIndex, 1);

      //부모 댓글에서 대댓글 id 삭제
      const targetChildIndex = targetParent.childrenCommentsIds?.findIndex(
        (comment) => comment === +commentId
      );
      targetParent.childrenCommentsIds?.splice(targetChildIndex!, 1);

      return HttpResponse.json(
        { code: 200, message: "대댓글 삭제에 성공했습니다." },
        { status: 200 }
      );
    }
  ),
];
