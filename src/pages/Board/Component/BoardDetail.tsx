import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  BoardCommentResult,
  BoardDetailResult,
  getBoardComment,
  getBoardDetail,
} from "../../../api";
import { contentBoxStyle, contentBtnStyle } from "../../../libs/utils";
import useUser from "../../../hooks/useUser";
import StyledButton from "../../../components/Button/StyledButton";
import BoardComment, { ModifyComment } from "./BoardComment/BoardComment";

function BoardDetail() {
  const { boardId } = useParams();
  const { user } = useUser();
  const { data: postData, isLoading: postLoading } =
    useQuery<BoardDetailResult>(["boardDetail", boardId], () =>
      getBoardDetail(boardId + "")
    );

  const { data: commentData, isLoading: commentLoading } =
    useQuery<BoardCommentResult>(["boardComment", boardId], () =>
      getBoardComment(boardId + "")
    );

  const pushDataToChidComments = (
    commentData: Pick<BoardCommentResult, "data">
  ): ModifyComment[] => {
    if (!commentData) {
      throw new Error(
        "changeIdsToComments 함수: 게시판 댓글 데이터가 존재하지 않습니다."
      );
    }
    const comments = commentData.data;

    const resultComments = comments.map((comment) => {
      const childIds = comment.childrenCommentsIds;
      const childDatas = comments.filter((item) => childIds?.includes(item.id));
      return {
        ...comment,
        childrenCommentsIds: childDatas,
      } as ModifyComment;
    });
    return resultComments;
  };
  const onGoodClick = () => {};
  const onModifyClick = () => {};
  const onDeleteClick = () => {};

  return (
    <>
      <div className="w-full space-y-2 bg-gray-100">
        <section className="p-6 bg-white rounded-lg shadow-md">
          <title className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{postData?.data?.title}</h1>
            <span className="text-gray-600">#{postData?.data?.id}</span>
          </title>
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-600">
              <span className="mr-2">작성자: {postData?.data?.author}</span>
              <span>작성일: {postData?.data?.createdAt}</span>
            </div>
            <div className="text-gray-500">
              <span>수정일: {postData?.data?.updatedAt}</span>
            </div>
          </div>
          <div className="mb-1">추천: {postData?.data?.like}</div>
          <div className="mb-4 space-x-3">
            <StyledButton onClick={onGoodClick} color="orange" text="추천" />
            <StyledButton onClick={onModifyClick} color="blue" text="수정" />
            <StyledButton onClick={onDeleteClick} color="red" text="삭제" />
            {user?.nickname === postData?.data?.author ? (
              <>
                <Link
                  to={`/board/modify/${boardId}`}
                  state={{
                    boardId,
                    author: postData?.data?.author,
                    title: postData?.data?.title,
                    content: postData?.data?.content,
                  }}
                >
                  <button
                    className={`${contentBtnStyle} bg-green-500 ring-green-500`}
                  >
                    수정
                  </button>
                </Link>
                <button
                  onClick={onDeleteClick}
                  className={`${contentBtnStyle} bg-red-500 ring-red-500`}
                >
                  삭제
                </button>
              </>
            ) : null}
          </div>
          <div className="mb-6 leading-relaxed text-gray-800">
            {postData?.data?.content}
          </div>
        </section>
        <section className={`${contentBoxStyle} space-y-4`}>
          {commentData &&
            pushDataToChidComments(commentData).map((comment) => (
              <BoardComment {...comment} />
            ))}
        </section>
      </div>
    </>
  );
}
export default BoardDetail;
