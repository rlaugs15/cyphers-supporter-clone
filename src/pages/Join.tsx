import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentBtnStyle, today } from "../libs/utils";
import {
  checkEmail,
  checkLoginId,
  checkNickname,
  MutationResult,
  setJoin,
  User,
} from "../api/userApi";
import { defaultAvatarImgUrl } from "../libs/userUtils";
import useUser from "../hooks/useUser";

interface IForm extends Omit<User, "avatar"> {
  avatar?: FileList;
  password2: string;
}

function Join() {
  const {} = useUser("nonUserOnly");

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>();

  //이미지 넣기
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [imgFile, setImgFIle] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const onAvatarUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgFIle(file);
    } else {
      URL.revokeObjectURL(imagePreview); // 메모리 해제
      setImagePreview("");
      setImgFIle(null);
    }
  };

  //이미지 미리보기
  useEffect(() => {
    let url = "";
    if (imgFile) {
      const blob = new Blob([imgFile], { type: "image/*" });
      const imageUrl = URL.createObjectURL(blob);
      setImagePreview(imageUrl);
      url = imageUrl;
    }
    // 클린업 함수로 메모리 해제
    return () => {
      if (imgFile) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imgFile]);

  //로그인id 중복 체크
  const [idSate, setIdState] = useState("");
  const { data: checkIdData, isLoading: checkIdLoading } =
    useQuery<MutationResult>(
      ["checkLoginId", idSate],
      () => checkLoginId(idSate),
      {
        retry: false,
        enabled: !!idSate,
        cacheTime: 0,
      }
    );
  const checkLoginIdClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const loginId = getValues("loginId");
    if (checkIdLoading) return;
    setIdState(loginId);
  };
  useEffect(() => {
    if (checkIdData && checkIdData.code !== 200) {
      setError("loginId", { message: checkIdData.message });
    }
    if (checkIdData && checkIdData.code === 200) {
      clearErrors("loginId");
    }
  }, [checkIdData, setError, clearErrors]);

  //닉네임 중복 체크
  const [nicknameSate, setNicknameState] = useState("");
  const { data: checkNickNameData, isLoading: checkNicknameLoading } =
    useQuery<MutationResult>(
      ["checkNickname", nicknameSate],
      () => checkNickname(nicknameSate),
      {
        retry: false,
        enabled: !!nicknameSate,
        cacheTime: 0,
      }
    );
  const checkNicknameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const nickname = getValues("nickname");
    if (checkNicknameLoading) return;
    setNicknameState(nickname);
  };
  useEffect(() => {
    if (checkNickNameData && checkNickNameData.code !== 200) {
      setError("nickname", { message: checkNickNameData.message });
    }
    if (checkNickNameData && checkNickNameData.code === 200) {
      clearErrors("nickname");
    }
  }, [checkNickNameData, setError, clearErrors]);

  //이메일 중복 체크
  const [emailSate, setEmailState] = useState("");
  const { data: checkEmailData, isLoading: checkEmailLoading } =
    useQuery<MutationResult>(
      ["checkemail", emailSate],
      () => checkEmail(emailSate),
      {
        retry: false,
        enabled: !!emailSate,
        cacheTime: 0,
      }
    );
  const checkEmailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const email = getValues("email");
    if (checkEmailLoading) return;
    setEmailState(email);
  };
  useEffect(() => {
    if (checkEmailData && checkEmailData.code !== 200) {
      setError("email", { message: checkEmailData.message });
    }
    if (checkEmailData && checkEmailData.code === 200) {
      clearErrors("email");
    }
  }, [checkEmailData, setError, clearErrors]);

  //회원가입
  const [joinFail, setJoinFail] = useState(false);
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: joinMutate, isLoading: joinLoading } = useMutation(setJoin, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      nav("/login", { replace: true });
    },
    onError: (error) => {
      console.error("회원가입 오류:", error);
      setJoinFail(true);
    },
  });

  const onJoinSubmit = (data: IForm) => {
    if (joinLoading) return;
    const { loginId, email, gender, birthDay, name, nickname, password } = data;
    if (data.password !== data.password2) {
      setError("password", { message: "비밀번호 확인과 일치하지 않습니다" });
    }
    const formData = new FormData();
    Object.entries({
      loginId,
      email,
      gender,
      birthDay,
      name,
      nickname,
      password,
    }).forEach(([key, value]) => formData.append(key, value));
    if (imgFile) {
      formData.append("avatar", imgFile);
    }
    joinMutate(formData);
  };
  useEffect(() => {
    if (joinFail) {
      setTimeout(() => setJoinFail(false), 2000);
    }
  }, [joinFail, setJoinFail]);

  const checkAllClear =
    checkEmailData?.code === 200 &&
    checkIdData?.code === 200 &&
    checkNickNameData?.code === 200;
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-tl from-slate-200 to-white">
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">회원가입</h2>
        <form onSubmit={handleSubmit(onJoinSubmit)} className="space-y-6">
          <section className="flex">
            <div className="flex flex-col items-center">
              <label
                htmlFor="avatar"
                className="flex items-center justify-center w-16 rounded-full aspect-square"
              >
                <img
                  className="object-cover w-16 rounded-full aspect-square"
                  src={imagePreview || defaultAvatarImgUrl}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  onChange={onAvatarUploadClick}
                  ref={hiddenInputRef}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                className={`${contentBtnStyle}`}
                onClick={() => hiddenInputRef.current?.click()}
              >
                이미지 변경하기
              </button>
            </div>
          </section>

          <div>
            <label
              htmlFor="loginId"
              className="block text-sm font-medium text-gray-700"
            >
              로그인ID
            </label>
            <input
              type="text"
              id="loginId"
              {...register("loginId", { required: "로그인ID는 필수입니다" })}
              className={`mt-1 block w-full border ${
                errors.loginId ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.loginId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.loginId.message}
              </p>
            )}
            {checkIdData && checkIdData?.code === 200 && !errors.loginId && (
              <p className="mt-1 text-sm text-blue-500">
                {checkIdData?.message}
              </p>
            )}
            <button
              type="button"
              onClick={checkLoginIdClick}
              className={`${contentBtnStyle}`}
            >
              로그인ID 중복 확인
            </button>
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              {...register("nickname", {
                required: "닉네임은 필수입니다",
                maxLength: {
                  value: 5,
                  message: "닉네임은 최대 5글자까지 가능합니다",
                },
              })}
              className={`mt-1 block w-full border ${
                errors.nickname ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.nickname && (
              <p className="mt-1 text-sm text-red-500">
                {errors.nickname.message}
              </p>
            )}
            {checkNickNameData &&
              checkNickNameData?.code === 200 &&
              !errors.nickname && (
                <p className="mt-1 text-sm text-blue-500">
                  {checkNickNameData?.message}
                </p>
              )}
            <button
              type="button"
              onClick={checkNicknameClick}
              className={`${contentBtnStyle}`}
            >
              닉네임 중복 확인
            </button>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "이메일은 필수입니다" })}
              className={`mt-1 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
            {checkEmailData &&
              checkEmailData?.code === 200 &&
              !errors.email && (
                <p className="mt-1 text-sm text-blue-500">
                  {checkEmailData?.message}
                </p>
              )}
            <button
              type="button"
              onClick={checkEmailClick}
              className={`${contentBtnStyle}`}
            >
              이메일 중복 확인
            </button>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "비밀번호를 설정하세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              className={`mt-1 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="password2"
              {...register("password2", {
                required: "비밀번호를 설정하세요.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/,
                  message:
                    "비밀번호는 8-20자 이내여야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              className={`mt-1 block w-full border ${
                errors.password2 ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password2 && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password2.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "이름은 필수입니다",
                maxLength: {
                  value: 20,
                  message: "이름은 최대 20글자까지 가능합니다",
                },
              })}
              className={`mt-1 block w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              성별
            </label>
            <select
              id="gender"
              {...register("gender", { required: "성별은 필수입니다" })}
              className={`mt-1 block w-full border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="male">남자</option>
              <option value="female">여자</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="birthDay"
              className="block text-sm font-medium text-gray-700"
            >
              생년월일
            </label>
            <input
              type="date"
              id="birthDay"
              max={today}
              {...register("birthDay", { required: "생일은 필수입니다" })}
              className={`mt-1 block w-full border ${
                errors.birthDay ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.birthDay && (
              <p className="mt-1 text-sm text-red-500">
                {errors.birthDay.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={checkAllClear ? false : true}
              className="w-full px-4 py-2 text-white bg-black rounded-md shadow-sm disabled:bg-gray-400 disabled:text-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {checkAllClear ? "회원가입" : "중복체크를 완료해주세요."}
            </button>
          </div>
        </form>
      </div>
      {joinFail && (
        <section className="absolute flex items-center justify-center h-32 bg-white border-2 border-black rounded-md w-80">
          <p className="mt-1 text-sm text-red-500">회원가입에 실패했습니다.</p>
        </section>
      )}
    </div>
  );
}

export default Join;
