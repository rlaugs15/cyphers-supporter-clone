import {
  deleteBoardParentComment,
  IBoardComment,
} from "../../../../../../api/boardApi";
import StyledButton from "../../../../../../components/Button/StyledButton";
import useUser from "../../../../../../hooks/useUser";
import BoardChildComment from "./BoardChildComment";
import { useState } from "react";
import WriteChildComment from "../WriteComment/WriteChildComment";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { errorTextStyle } from "../../../../../../libs/utils";
import AvatarImg from "../../../../../../components/images/AvatarImg";

export interface ModifyComment
  extends Omit<IBoardComment, "childrenCommentsIds"> {
  childrenCommentsIds?: ModifyComment[];
}

function BoardComment({
  id,
  content,
  createdAt,
  userId,
  userAvatar,
  userNickname,
  childrenCommentsIds,
}: ModifyComment) {
  const { user } = useUser();
  const { boardId } = useParams();

  const [openComment, setOpenComment] = useState(false);

  const openCommentClick = () => {
    setOpenComment((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const { mutate, data, isLoading } = useMutation(deleteBoardParentComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("boardComment");
    },
  });

  const onDeleteClick = () => {
    if (isLoading) return;
    mutate({ boardId: +boardId!, commentId: id });
  };

  return (
    <div className="space-y-2">
      <section className="flex flex-col items-start justify-between p-2 space-y-2 border-2 rounded-md border-slate-300">
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
            {user ? (
              <StyledButton
                color="green"
                text="답글"
                onClick={openCommentClick}
              />
            ) : null}

            <p className="text-sm text-slate-500">{createdAt}</p>
          </div>
        </article>
        <span>{content}</span>
      </section>
      {openComment ? (
        <WriteChildComment
          boardId={+boardId!}
          userId={user?.id!}
          userAvatar={user?.avatar}
          userNickname={user?.nickname!}
          parentCommentId={id}
        />
      ) : null}

      {childrenCommentsIds?.map((comment) => (
        <BoardChildComment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          userId={comment.userId}
          userAvatar={comment.userAvatar}
          createdAt={comment.createdAt}
          parentCommentId={comment.parentCommentId}
          userNickname={comment.userNickname}
        />
      ))}
    </div>
  );
}

export default BoardComment;
