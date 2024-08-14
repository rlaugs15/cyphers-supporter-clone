import { useForm } from "react-hook-form";
import StyledButton from "../../../components/Button/StyledButton";
import { errorTextStyle } from "../../../libs/utils";
import { MutationResult, patchUserProfile, User } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

type IForm = Pick<User, "loginId" | "nickname">;

function EditProfile() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(patchUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("member");
      nav(-1);
    },
    onError: (error: MutationResult) => {
      if (error?.code === 400) {
        setError("loginId", { message: error?.message });
      }
      if (error?.code === 409) {
        setError("nickname", { message: error.message });
      }
    },
  });

  const onEditSubmit = (data: IForm) => {
    if (isLoading) return;
    mutate(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          회원정보 수정
        </h2>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="loginId"
            >
              로그인ID{" "}
              {errors.loginId && (
                <span className={`${errorTextStyle}`}>
                  {errors.loginId.message}
                </span>
              )}
            </label>
            <input
              {...register("loginId", { required: "로그인ID는 필수입니다." })}
              type="text"
              id="loginId"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="로그인ID를 입력해주세요."
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="nickname"
            >
              변경할 닉네임{" "}
              {errors.nickname && (
                <span className={`${errorTextStyle}`}>
                  {errors.nickname.message}
                </span>
              )}
            </label>
            <input
              {...register("nickname", {
                required: "닉네임은 필수입니다",
                maxLength: {
                  value: 5,
                  message: "닉네임은 최대 5글자까지 가능합니다",
                },
              })}
              type="text"
              id="nickname"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="닉네임을 입력해주세요."
              required
            />
          </div>
          <StyledButton color="black" text="닉네임 변경" cssClass="w-full" />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
