import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkEmail,
  checkLoginId,
  checkNickname,
  MutationResult,
  setJoin,
  User,
} from "../../api/userApi";
import useUser from "../../hooks/useUser";
import useImagePreview from "@/hooks/useImagePreview";
import AvatarUploader from "../../components/form/AvatarUploader";
import DuplicateCheckButton from "./Component/DuplicateCheckButton";
import FormField from "../../components/form/FormField";
import ValidationMessage from "../../components/form/ValidationMessage";

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
  const { imageFile, imagePreview, handleFileChange } = useImagePreview();

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

  const checkLoginIdClick = () => {
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

  const checkNicknameClick = () => {
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
  const checkEmailClick = () => {
    const email = getValues("email");

    // 이메일 형식 검증 (정규식 사용)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setError("email", { message: "올바른 이메일 형식을 입력하세요" });
      return;
    }

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
    if (imageFile) {
      formData.append("avatar", imageFile);
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
            <AvatarUploader
              imagePreview={imagePreview}
              hiddenInputRef={hiddenInputRef}
              handleFileChange={handleFileChange}
            />
          </section>
          <section>
            <FormField
              label="로그인ID"
              id="loginId"
              register={register}
              validation={{ required: "로그인ID는 필수입니다" }}
              errors={errors}
              placeholder="중복 ID: loginId1"
            />
            <ValidationMessage
              errorMessage={errors.loginId?.message}
              successMessage={checkIdData?.message}
            />
            <DuplicateCheckButton
              label="로그인ID 중복 확인"
              onClick={checkLoginIdClick}
              isLoading={checkIdLoading}
            />
          </section>
          <section>
            <FormField
              label="닉네임"
              id="nickname"
              register={register}
              validation={{
                required: "닉네임은 필수입니다",
                maxLength: {
                  value: 5,
                  message: "닉네임은 최대 5글자까지 가능합니다",
                },
              }}
              errors={errors}
              placeholder="중복 닉네임: 울라리"
            />
            <ValidationMessage
              errorMessage={errors.nickname?.message}
              successMessage={checkNickNameData?.message}
            />
            <DuplicateCheckButton
              label="닉네임 중복 확인"
              onClick={checkNicknameClick}
              isLoading={checkNicknameLoading}
            />
          </section>
          <section>
            <FormField
              label="이메일"
              type="email"
              id="email"
              register={register}
              validation={{
                required: "이메일은 필수입니다",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "올바른 이메일 형식을 입력하세요",
                },
              }}
              errors={errors}
              placeholder="중복 email: rlagus123@gmail.com"
            />
            <ValidationMessage
              errorMessage={errors.nickname?.message}
              successMessage={checkEmailData?.message}
            />
            <DuplicateCheckButton
              label="이메일 중복 확인"
              onClick={checkEmailClick}
              isLoading={checkEmailLoading}
            />
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
            />
            <ValidationMessage errorMessage={errors.password?.message} />
          </section>
          <section>
            <FormField
              label="비밀번호 확인"
              type="password"
              id="password2"
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
            />
            <ValidationMessage errorMessage={errors.password2?.message} />
          </section>
          <section>
            <FormField
              label="이름"
              id="name"
              register={register}
              validation={{
                required: "이름은 필수입니다",
                maxLength: {
                  value: 20,
                  message: "이름은 최대 20글자까지 가능합니다",
                },
              }}
              errors={errors}
            />
            <ValidationMessage errorMessage={errors.name?.message} />
          </section>
          <section>
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
            <ValidationMessage errorMessage={errors.gender?.message} />
          </section>
          <section>
            <FormField
              label="생년월일"
              type="date"
              id="birthDay"
              register={register}
              validation={{ required: "생일은 필수입니다" }}
              errors={errors}
            />
            <ValidationMessage errorMessage={errors.birthDay?.message} />
          </section>
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
