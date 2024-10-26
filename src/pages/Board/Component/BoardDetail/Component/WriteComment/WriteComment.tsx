import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IBoardComment,
  writeParentComment,
} from "../../../../../../api/boardApi";
import { errorTextStyle } from "../../../../../../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import useUser from "../../../../../../hooks/useUser";
import { useParams } from "react-router-dom";
import Textarea from "../../../../../../components/Textarea";
import { MutationResult } from "../../../../../../api/userApi";

type IForm = Pick<IBoardComment, "content">;

function WriteComment() {
  const { user } = useUser();

  const { boardId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IForm>();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(writeParentComment, {
    onSuccess: () => {
      // onSuccess: (data, variables) 이런 식으로 각각 응답받는 데이터, muate에 전달한 데이터를 사용할 수도 있다.
      // 데이터를 새로고침
      queryClient.invalidateQueries("boardComment");
    },
    onError: (error: MutationResult) => {
      setError("content", { message: error.message });
    },
  });

  const onCommentSubmit = ({ content }: IForm) => {
    if (!user) return;
    if (isLoading) return;
    const data: any = {
      userId: user.id,
      userNickname: user.nickname,
      content,
    };

    if (user && user.avatar) {
      data.userAvatar = user.avatar;
    }

    mutate({ boardId: +boardId!, data });
  };

  useEffect(() => {
    if (!isSubmitting) return;
    if (isSubmitting) {
      setValue("content", "");
    }
  }, [setValue, isSubmitting]);

  return (
    <form className="flex flex-col w-full space-y-2">
      {errors?.content && (
        <p className={`${errorTextStyle}`}>{errors?.content.message}</p>
      )}
      <Textarea
        handleSubmit={handleSubmit}
        register={register("content", {
          required: true,
          maxLength: {
            value: 200,
            message: "200자 이하로 써주세요",
          },
        })}
        isSubmitting={isSubmitting}
        onSubmit={onCommentSubmit}
      />
    </form>
  );
}

export default WriteComment;
