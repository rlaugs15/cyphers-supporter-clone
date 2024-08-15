import { useForm } from "react-hook-form";
import {
  sendTempPassword,
  SendTempPasswordResult,
  User,
} from "../../../api/userApi";
import { errorTextStyle } from "../../../libs/utils";
import StyledButton from "../../../components/Button/StyledButton";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import ConfirmBox from "../../../components/ConfirmBox";
import { useNavigate } from "react-router-dom";

type IForm = Pick<User, "loginId" | "email">;

function FindPassword() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [confirm, setConfirm] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(sendTempPassword, {
    onSuccess: (data) => {
      setConfirm(true);
      setTempPassword(String(data.data?.password));
      queryClient.invalidateQueries("member");
    },
    onError: (error: SendTempPasswordResult) => {
      setErrorMessage(String(error.message));
    },
  });

  const onSubmit = (data: IForm) => {
    if (isLoading) return;
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          비밀번호 찾기
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="loginId"
            >
              로그인 ID{" "}
              {errors.loginId && (
                <span className={`${errorTextStyle}`}>
                  {errors.loginId.message}
                </span>
              )}
            </label>
            <input
              {...register("loginId", {
                required: "로그인 ID를 입력해주세요.",
              })}
              type="text"
              id="loginId"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="로그인 ID를 입력해주세요."
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="email"
            >
              이메일{" "}
              {errors.email && (
                <span className={`${errorTextStyle}`}>
                  {errors.email.message}
                </span>
              )}
            </label>
            <input
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "유효한 이메일 주소를 입력해주세요.",
                },
              })}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="이메일을 입력해주세요."
              required
            />
          </div>
          {errorMessage && (
            <div className="flex justify-center">
              <span className={`${errorTextStyle}`}>{errorMessage}</span>
            </div>
          )}
          <StyledButton
            color="black"
            text="임시 비밀번호 받기"
            cssClass="w-full"
          />
        </form>
      </div>
      {confirm ? (
        <ConfirmBox text="임시 비밀번호를 확인해주세요.">
          <div className="flex flex-col items-center space-y-2">
            <div>
              임시 비밀번호:{" "}
              <span className="font-semibold">{tempPassword}</span>
            </div>
            <StyledButton
              color="black"
              text="확인"
              onClick={() => nav("/login")}
            />
          </div>
        </ConfirmBox>
      ) : null}
    </div>
  );
}

export default FindPassword;
