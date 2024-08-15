import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getMember } from "../api/userApi";

export interface MutationResult {
  code?: number;
  message?: string;
}

interface IUser {
  id: string;
  email: string;
  nickname: string;
  profileImg?: string;
  createdAt?: string; // 생성일 (LocalDateTime은 ISO 문자열로 변환됨)
}

interface IApiResponse extends MutationResult {
  data: IUser;
}

type UserState = "userOnly" | "nonUserOnly";

// 로그인된 사용자의 정보를 가져오고 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트
export default function useUser(userState?: UserState) {
  const { data, error } = useQuery<IApiResponse>(["member"], () => getMember());

  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (error) {
      console.error("사용자 데이터 가져오는 중 오류 발생:", error);
      return;
    }
    if (userState === "nonUserOnly" && data) {
      nav("/");
    }
    if (userState === "userOnly" && !data) {
      nav("/login", { replace: true });
    }
    if (data && data?.code === 200 && pathname === "/login") {
      nav("/", { replace: true });
    }
  }, [data, error, nav, pathname, userState]);

  return { user: data?.data, isLoading: !data && !error };
}
