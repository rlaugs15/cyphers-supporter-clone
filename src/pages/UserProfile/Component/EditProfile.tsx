import { useForm } from "react-hook-form";
import StyledButton from "../../../components/Button/StyledButton";
import { contentBtnStyle, errorTextStyle } from "../../../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { MutationResult, patchUserProfile, User } from "../../../api/userApi";
import { useEffect, useRef, useState } from "react";
import { defaultAvatarImgUrl } from "../../../libs/userUtils";
import useUser from "../../../hooks/useUser";

type PickUser = Pick<User, "loginId" | "nickname">;

interface IForm extends PickUser {
  avatar: FileList;
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
      loginId: user?.id,
      nickname: user?.nickname,
    },
  });

  //이미지 넣기
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [imgFile, setImgFIle] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const onAvatarUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgFIle(file);
    } else {
      //이미지가 이미 있을 때 이미지를 새로 선택 안 할 경우 취소
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
    // 미리보기가 있을 때만 클린업 함수로 메모리 해제
    return () => {
      if (imgFile) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imgFile]);

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
    const formData = new FormData();
    formData.append("loginId", data.loginId); // loginId 추가
    formData.append("nickname", data.nickname); // nickname 추가

    if (imgFile) {
      formData.append("avatar", imgFile); // 파일이 있을 경우 avatar로 추가
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
          <StyledButton color="black" text="수정하기" cssClass="w-full" />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
