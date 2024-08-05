import { http, HttpResponse } from "msw";
import { SignJWT, jwtVerify } from "jose";
import { logout } from "../tokenInstance";
import { ICharacterComment, User } from "../api";
import { characterComments, posts, users } from "./data";

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

    if (user) {
      return HttpResponse.json(
        { code: 409, message: "존재하는 로그인ID입니다." },
        { status: 409 }
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
        { status: 409 }
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
        { status: 409 }
      );
    }
    return HttpResponse.json(
      { code: 200, message: "사용할 수 있는 이메일입니다." },
      { status: 200 }
    );
  }),

  // 캐릭터 댓글 GET 요청
  http.get("/api/v1/auth/character/comment/:characterId", ({ params }) => {
    const { characterId } = params;
    const characterComment = characterComments.filter(
      (character) => character.characterId === characterId
    );

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

    const data = (await request.json()) as User;
    data.createdAt = formattedDate;
    users.push(data);
    const joinResult = users.find((user) => user.loginId === data.loginId);
    if (!joinResult) {
      return HttpResponse.json(
        { code: 500, message: "회원가입 실패" },
        { status: 500 }
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
        { status: 400 }
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
        { status: 400 }
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
  http.post("/api/v1/logout", async ({ request }) => {
    logout();
    return HttpResponse.json({ code: 200 }, { status: 200 });
  }),

  //캐릭터 댓글작성 요청
  http.post(
    "/api/v1/auth/character/comment/:characterId",
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
      characterComments.push({
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
];
