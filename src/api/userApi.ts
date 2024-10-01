import axios from "axios";
import { handleAxiosError } from "../libs/handleAxiosError";
import tokenInstance from "../tokenInstance";

export interface MutationResult {
  code: number;
  message?: string;
}

export interface User {
  avatar?: string;
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
export async function setJoin(formData: FormData) {
  const response = await axios.post("/api/v1/join", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

//회원 정보 수정
export async function patchUserProfile(formData: FormData) {
  return handleAxiosError<MutationResult>(
    axios
      .patch("/api/v1/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  );
}

//비밀번호 변경
export interface IChangPass {
  loginId: string;
  currentPassword: string;
  newPassword: string;
}

export async function patchUserPassword(body: IChangPass) {
  return handleAxiosError<MutationResult>(
    axios.patch("/api/v1/password", body).then((res) => res.data)
  );
}

//회원 탈퇴
export async function deleteUserProfile(
  body: Pick<User, "loginId" | "password">
) {
  return handleAxiosError<MutationResult>(
    axios
      .delete("/api/v1/me", {
        data: {
          loginId: body.loginId,
          password: body.password,
        },
      })
      .then((res) => res.data)
  );
}

//로그인id 찾기
export interface FindLoginIdResult extends MutationResult {
  data?: {
    loginId: string;
  };
}
export async function findLoginId(
  body: Pick<User, "email" | "name" | "gender" | "birthDay">
) {
  return handleAxiosError<FindLoginIdResult>(
    axios.post("/api/v1/auth/find-loginid", body).then((res) => res.data)
  );
}

//임시 비밀번호 전송
export interface SendTempPasswordResult extends MutationResult {
  data?: {
    password: string;
  };
}
export async function sendTempPassword(body: Pick<User, "loginId" | "email">) {
  return handleAxiosError<SendTempPasswordResult>(
    axios
      .post("/api/v1/auth/send-temporary-password", body)
      .then((res) => res.data)
  );
}
