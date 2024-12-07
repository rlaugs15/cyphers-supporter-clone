import { useForm } from "react-hook-form";
import { contentBtnStyle } from "../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setLogin, User } from "../api/userApi";
import useUser from "../hooks/useUser";
import FormField from "@/components/form/FormField";
import ValidationMessage from "../components/form/ValidationMessage";

type IForm = Pick<User, "loginId" | "password">;

function Login() {
  const {} = useUser("nonUserOnly");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const nav = useNavigate();
  const [loginFlail, setLoginFail] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    data: loginData,
  } = useMutation(setLogin, {
    onSuccess: (data) => {
      if (data.code === 200 && data.data.token) {
        localStorage.setItem("accessToken", data.data.token);
        queryClient.invalidateQueries("member");
        nav(-1);
      }

      if (data.code !== 200) {
        setLoginFail(true);
      }
    },
    onError: (error) => {
      console.error("로그인:", error);
    },
  });
  const onLoginSubmit = (data: IForm) => {
    if (loginLoading) return;
    loginMutate(data);
  };
  useEffect(() => {
    if (loginFlail) {
      setTimeout(() => setLoginFail(false), 2000);
    }
  }, [loginFlail, setLoginFail]);
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-tl from-slate-200 to-white">
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">로그인</h2>
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
          <section>
            <FormField
              label="로그인ID"
              id="loginId"
              register={register}
              validation={{ required: "로그인ID는 필수입니다" }}
              errors={errors}
              placeholder="모킹ID: loginId1"
            />
            <ValidationMessage errorMessage={errors.loginId?.message} />
          </section>
          <section>
            <FormField
              label="비밀번호"
              type="password"
              id="password"
              register={register}
              validation={{
                required: "비밀번호를 설정하세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              }}
              errors={errors}
              placeholder="모킹 pass: 김현준123!!"
            />
            <ValidationMessage errorMessage={errors.password?.message} />
          </section>
          <div className="flex flex-col items-center justify-center">
            <button className={`${contentBtnStyle}`}>로그인</button>
          </div>
        </form>
      </div>
      {loginFlail && (
        <section className="absolute flex items-center justify-center h-32 bg-white border-2 border-black rounded-md w-80">
          <p className="mt-1 text-sm text-red-500">{loginData?.message}</p>
        </section>
      )}
    </div>
  );
}

export default Login;
