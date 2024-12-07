import { useForm } from "react-hook-form";
import StyledButton from "../../../components/Button/StyledButton";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { MutationResult, patchUserProfile, User } from "../../../api/userApi";
import { useRef } from "react";
import useUser from "../../../hooks/useUser";
import useImagePreview from "@/hooks/useImagePreview";
import AvatarUploader from "@/components/form/AvatarUploader";
import FormField from "@/components/form/FormField";
import ValidationMessage from "@/components/form/ValidationMessage";

type PickUser = Pick<User, "loginId" | "nickname">;

interface IForm extends PickUser {
  avatar: FileList | null;
}

function EditProfile() {
  const nav = useNavigate();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      nickname: user?.nickname,
    },
  });

  //이미지 넣기
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const { imageFile, imagePreview, handleFileChange } = useImagePreview(
    user?.avatar
  );

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
    if (data.loginId !== user?.id) {
      setError("loginId", { message: "아이디를 확인해주세요." });
      return;
    }
    const formData = new FormData();
    formData.append("loginId", data.loginId); // loginId 추가
    formData.append("nickname", data.nickname); // nickname 추가

    if (imageFile) {
      formData.append("avatar", imageFile); // 파일이 있을 경우 avatar로 추가
    }
    mutate(formData); // FormData 객체를 서버로 전송
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          회원정보 수정
        </h2>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          <AvatarUploader
            imagePreview={imagePreview}
            hiddenInputRef={hiddenInputRef}
            handleFileChange={handleFileChange}
          />
          <div className="mb-4">
            <FormField
              label="로그인ID"
              id="loginId"
              register={register}
              validation={{ required: "로그인ID는 필수입니다." }}
              errors={errors}
              placeholder="로그인ID를 입력해주세요. 모킹ID: login1"
              required
            />
            <ValidationMessage errorMessage={errors.loginId?.message} />
          </div>
          <div className="mb-4">
            <FormField
              label="변경할 닉네임"
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
              placeholder="닉네임을 입력해주세요."
              required
            />
            <ValidationMessage errorMessage={errors.nickname?.message} />
          </div>
          <StyledButton color="black" text="수정하기" cssClass="w-full" />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
