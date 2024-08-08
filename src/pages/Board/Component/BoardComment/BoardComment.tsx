import type { BoardComment } from "../../../../api";
import StyledButton from "../../../../components/Button/StyledButton";
import useUser from "../../../../hooks/useUser";
import BoardChildComment from "./BoardChildComment";

export interface ModifyComment
  extends Omit<BoardComment, "childrenCommentsIds"> {
  childrenCommentsIds?: ModifyComment[];
}

function BoardComment({
  id,
  content,
  createdAt,
  userId,
  userNickname,
  childrenCommentsIds,
}: ModifyComment) {
  const { user } = useUser();
  const onDeleteClick = () => {};
  return (
    <div className="space-y-2">
      <div
        key={id}
        className="flex flex-col items-start justify-between p-2 space-y-2 border-2 rounded-md border-slate-300"
      >
        <article className="flex items-center justify-between w-full space-x-2">
          <div className="flex items-center w-auto space-x-1">
            <figure className="bg-red-300 rounded-full w-7 aspect-square" />
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
      {childrenCommentsIds?.map((comment) => (
        <BoardChildComment {...comment} />
      ))}
    </div>
  );
}

export default BoardComment;
