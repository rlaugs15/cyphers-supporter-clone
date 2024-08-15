import { useForm } from "react-hook-form";
import StyledButton from "../../../components/Button/StyledButton";
import { errorTextStyle, today } from "../../../libs/utils";
import { findLoginId, FindLoginIdResult, User } from "../../../api/userApi";
import { useMutation, useQueryClient } from "react-query";
import ConfirmBox from "../../../components/ConfirmBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type IForm = Pick<User, "email" | "name" | "gender" | "birthDay">;

function FindLoginId() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [confirm, setConfirm] = useState(false);
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(findLoginId, {
    onSuccess: (data) => {
      setConfirm(true);
      setUserId(String(data.data?.loginId));
      queryClient.invalidateQueries("member");
    },
    onError: (error: FindLoginIdResult) => {
      setErrorMessage(String(error.message));
    },
  });

  const onfindLoginIdSubmit = (data: IForm) => {
    if (isLoading) return;
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          로그인 ID 찾기
        </h2>
        <form onSubmit={handleSubmit(onfindLoginIdSubmit)}>
          <div className="mb-4">
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

          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="name"
            >
              이름{" "}
              {errors.name && (
                <span className={`${errorTextStyle}`}>
                  {errors.name.message}
                </span>
              )}
            </label>
            <input
              {...register("name", { required: "이름을 입력해주세요." })}
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="이름을 입력해주세요."
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="gender"
            >
              성별{" "}
              {errors.gender && (
                <span className={`${errorTextStyle}`}>
                  {errors.gender.message}
                </span>
              )}
            </label>
            <select
              {...register("gender", { required: "성별을 선택해주세요." })}
              id="gender"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="birthDay"
            >
              생년월일{" "}
              {errors.birthDay && (
                <span className={`${errorTextStyle}`}>
                  {errors.birthDay.message}
                </span>
              )}
            </label>
            <input
              {...register("birthDay", {
                required: "생년월일을 입력해주세요.",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "YYYY-MM-DD 형식의 생년월일을 입력해주세요.",
                },
              })}
              type="date"
              id="birthDay"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="생년월일을 입력해주세요."
              max={today}
              required
            />
          </div>
          {errorMessage && (
            <div className="flex justify-center">
              <span className={`${errorTextStyle}`}>{errorMessage}</span>
            </div>
          )}
          <StyledButton color="black" text="로그인 ID 찾기" cssClass="w-full" />
        </form>
      </div>
      {confirm ? (
        <ConfirmBox text="로그인ID를 확인해주세요.">
          <div className="flex flex-col items-center space-y-2">
            <div>
              로그인ID: <span className="font-semibold">{userId}</span>
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

export default FindLoginId;
