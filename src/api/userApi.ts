import axios from "axios";
import { handleAxiosError } from "../libs/handleAxiosError";
import tokenInstance from "../tokenInstance";

export interface MutationResult {
  code: number;
  message?: string;
}

export interface User {
  loginId: string;
  nickname: string;
  password: string;
  name: string;
  gender: string;
  birthDay: string;
  email: string;
  createdAt?: string;
}

export async function getMember() {
  const response = await tokenInstance.get("/member");
  return response.data;
}

//로그인id 중복 체크
export async function checkLoginId(loginId: string) {
  return handleAxiosError<MutationResult>(
    axios.get(`/api/v1/auth/check-loginid/${loginId}`).then((res) => res.data)
  );
}

//닉네임 중복 체크
export async function checkNickname(nickname: string) {
  return handleAxiosError<MutationResult>(
    axios.get(`/api/v1/auth/check-nickname/${nickname}`).then((res) => res.data)
  );
}

//이메일 중복 체크
export async function checkEmail(email: string) {
  return handleAxiosError<MutationResult>(
    axios.get(`/api/v1/auth/check-email/${email}`).then((res) => res.data)
  );
}

//회원가입
export async function setJoin(body: User) {
  const response = await axios.post("/api/v1/join", body);
  return response.data;
}

//로그인
export interface LoginResult extends MutationResult {
  data: {
    token: string;
    refreshToken: string;
  };
}
export async function setLogin(body: Pick<User, "loginId" | "password">) {
  return handleAxiosError<LoginResult>(
    axios.post("/api/v1/login", body).then((res) => res.data)
  );
}

//로그아웃
export async function setLogout(body: {}) {
  const response = await axios.post("/api/v1/logout", body);
  return response.data;
}

