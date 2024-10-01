import { useMutation, useQueryClient } from "react-query";
import StyledButton from "../../../../../../components/Button/StyledButton";
import useUser from "../../../../../../hooks/useUser";
import { ModifyComment } from "./BoardComment";
import { deleteBoardChildComment } from "../../../../../../api/boardApi";
import { useParams } from "react-router-dom";
import { errorTextStyle } from "../../../../../../libs/utils";
import AvatarImg from "../../../../../../components/images/AvatarImg";

function BoardChildComment({
  id,
  userId,
  userAvatar,
  userNickname,
  content,
  createdAt,
  parentCommentId,
}: ModifyComment) {
  const { user } = useUser();
  const { boardId } = useParams();

  const queryClient = useQueryClient();
  const { mutate, data, isLoading } = useMutation(deleteBoardChildComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("boardComment");
    },
  });

  const onDeleteClick = () => {
    if (isLoading) return;
    mutate({
      boardId: +boardId!,
      commentId: id,
      parentCommentId: parentCommentId!,
    });
  };

  return (
    <div className="flex flex-col items-start justify-between p-2 ml-5 space-y-2 border-2 rounded-md border-slate-300">
      {data && data.code !== 200 && (
        <span className={`${errorTextStyle} w-full text-center`}>
          {data.message}
        </span>
      )}
      <article className="flex items-center justify-between w-full space-x-2">
        <div className="flex items-center w-auto space-x-1">
          <AvatarImg userAvatar userAvatarUrl={userAvatar} size="8" />
          <figcaption className="font-semibold">{userNickname}</figcaption>
        </div>
        <div className="flex items-center space-x-4">
          {user && user?.id === userId ? (
            <StyledButton color="red" text="삭제" onClick={onDeleteClick} />
          ) : null}
          <p className="text-sm text-slate-500">{createdAt}</p>
        </div>
      </article>
      <span>{content}</span>
    </div>
  );
}

export default BoardChildComment;
