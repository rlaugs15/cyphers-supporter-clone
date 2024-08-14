import { useForm } from "react-hook-form";
import StyledButton from "../../../components/Button/StyledButton";
import { IChangPass, MutationResult, patchUserPassword } from "../../../api";
import { errorTextStyle } from "../../../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";

type IForm = Pick<IChangPass, "currentPassword" | "newPassword"> & {
  newPassword2: string;
};

function ChangePass() {
  const nav = useNavigate();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(patchUserPassword, {
    onSuccess: () => {
      queryClient.invalidateQueries("member");
      nav(-1);
    },
    onError: (error: MutationResult) => {
      if (error?.code === 401) {
        setError("currentPassword", { message: error?.message });
      }
    },
  });

  const onChangPassSubmit = ({
    currentPassword,
    newPassword,
    newPassword2,
  }: IForm) => {
    if (isLoading) return;
    if (currentPassword === newPassword || currentPassword === newPassword2) {
      setError("newPassword", { message: "기존 비밀번호와 일치합니다." });
      return;
    }
    if (newPassword !== newPassword2) {
      setError("newPassword", {
        message: "새로운 비밀번호 확인 작업을 검토해주세요.",
      });
      return;
    }
    mutate({ loginId: user?.id!, currentPassword, newPassword });
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          비밀번호 변경
        </h2>
        <form onSubmit={handleSubmit(onChangPassSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="current-password"
            >
              현재 비밀번호{" "}
              {errors.currentPassword && (
                <span className={`${errorTextStyle}`}>
                  {errors.currentPassword.message}
                </span>
              )}
            </label>
            <input
              {...register("currentPassword", {
                required: "기존 비밀번호를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              type="password"
              id="current-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="new-password"
            >
              새로운 비밀번호{" "}
              {errors.newPassword && (
                <span className={`${errorTextStyle}`}>
                  {errors.newPassword.message}
                </span>
              )}
            </label>
            <input
              {...register("newPassword", {
                required: "새로운 비밀번호를 입력해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              type="password"
              id="new-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="새로운 비밀번호를 입력해주세요."
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="confirm-password"
            >
              새로운 비밀번호 확인{" "}
              {errors.newPassword2 && (
                <span className={`${errorTextStyle}`}>
                  {errors.newPassword2.message}
                </span>
              )}
            </label>
            <input
              {...register("newPassword2", {
                required: "새로운 비밀번호를 확인해주세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="새로운 비밀번호를 확인해주세요."
              required
            />
          </div>
          <StyledButton color="black" text="비밀번호 변경" cssClass="w-full" />
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
