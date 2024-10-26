import { useForm } from "react-hook-form";
import Textarea from "../../../../../../components/Textarea";
import {
  IBoardComment,
  writechildrenComment,
} from "../../../../../../api/boardApi";
import { useMutation, useQueryClient } from "react-query";
import { MutationResult } from "../../../../../../api/userApi";
import { errorTextStyle } from "../../../../../../libs/utils";
import { useEffect } from "react";
import useUser from "../../../../../../hooks/useUser";

type IForm = Pick<IBoardComment, "content">;

interface WriteChildCommentProps {
  boardId: number;
  userId: string;
  userAvatar?: string;
  userNickname: string;
  parentCommentId: number;
}

function WriteChildComment({
  boardId,
  userId,
  userNickname,
  userAvatar,
  parentCommentId,
}: WriteChildCommentProps) {
  const {} = useUser();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IForm>();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(writechildrenComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "boardComment" });
    },
    onError: (error: MutationResult) => {
      setError("content", { message: error.message });
    },
  });

  const onSubmit = ({ content }: IForm) => {
    if (!userId) return;
    if (isLoading) return;
    const data: any = {
      userId,
      userNickname,
      content,
      parentCommentId,
    };

    if (userAvatar) {
      data.userAvatar = userAvatar;
    }
    mutate({ boardId, data });
  };

  useEffect(() => {
    if (!isSubmitting) return;
    if (isSubmitting) {
      setValue("content", "");
    }
  }, [setValue, isSubmitting]);

  return (
    <>
      {userId ? (
        <section className="flex flex-col items-center p-1 border-2 rounded-md bg-slate-400">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full h-24 grid-cols-1"
          >
            {errors.content && (
              <p className={`${errorTextStyle} text-center`}>
                {errors.content?.message}
              </p>
            )}
            <Textarea
              register={register("content", {
                required: true,
                maxLength: {
                  value: 200,
                  message: "200자 이하로 써주세요",
                },
              })}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
            />
          </form>

          <div>
            <span>
              <p className="font-semibold">[공지]</p>정치 자료, 남녀 분란 자료,
              저격 자료, 분란 야기 게시물은 강력하게 제재합니다.
            </span>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default WriteChildComment;
