import { useForm } from "react-hook-form";
import { errorTextStyle } from "../../../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import { deleteUserProfile, MutationResult } from "../../../api";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../../components/Button/StyledButton";
import { useState } from "react";
import { logout } from "../../../tokenInstance";

interface IForm {
  password: string;
  password2: string;
}

function QuitUser() {
  const { user } = useUser();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<IForm>();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteUserProfile, {
    onSuccess: () => {
      logout();
      queryClient.removeQueries("member");
      nav(-1);
    },
    onError: (error: MutationResult) => {
      setConfirm(false);
      if (error?.code === 401) {
        setError("password", { message: error?.message });
      }
    },
  });

  const [confirm, setConfirm] = useState(false);
  const onQuitUserSubmit = ({ password, password2 }: IForm) => {
    if (password !== password2) {
      setError("password2", {
        message: "기존 비밀번호와 일치하지 않습니다.",
      });
      return;
    }
    setConfirm(true);
  };

  const onConfirmClick = () => {
    if (isLoading) return;
    const password = getValues("password");
    mutate({ loginId: user?.id!, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          회원 탈퇴
        </h2>
        <form onSubmit={handleSubmit(onQuitUserSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="password"
            >
              비밀번호{" "}
              {errors.password && (
                <span className={`${errorTextStyle}`}>
                  {errors.password.message}
                </span>
              )}
            </label>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="현재 비밀번호를 입력해주세요."
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="confirm-password"
            >
              비밀번호 확인{" "}
              {errors.password2 && (
                <span className={`${errorTextStyle}`}>
                  {errors.password2.message}
                </span>
              )}
            </label>
            <input
              {...register("password2", {
                required: "비밀번호를 확인해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="비밀번호를 확인해주세요.."
              required
            />
          </div>

          <StyledButton color="red" text="회원탈퇴" cssClass="w-full" />
        </form>
      </div>
      {confirm ? (
        <section className="릳 absolute flex flex-col space-y-3 items-center justify-center h-32 bg-white border-2 border-black rounded-md w-80">
          <p className="mt-1 text-sm">정말 탈퇴하시겠습니까?</p>
          <StyledButton color="red" text="확인" onClick={onConfirmClick} />
        </section>
      ) : null}
    </div>
  );
}

export default QuitUser;
