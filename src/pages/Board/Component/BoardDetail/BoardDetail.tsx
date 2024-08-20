import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { contentBoxStyle } from "../../../../libs/utils";
import useUser from "../../../../hooks/useUser";
import BoardComment, {
  ModifyComment,
} from "./Component/BoardComment/BoardComment";
import Skeleton from "react-loading-skeleton";
import {
  BoardCommentResult,
  getBoardComment,
  getBoardDetail,
  getBoardLikes,
} from "../../../../api/boardApi";
import WriteComment from "./Component/WriteComment/WriteComment";
import BoardLikeBtn from "./Component/ActionButtons/BoardLikeBtn";
import BoardEditBtn from "./Component/ActionButtons/BoardEditBtn";
import BoardDeleteBtn from "./Component/ActionButtons/BoardDeleteBtn";

function BoardDetail() {
  const { boardId } = useParams();
  const { user } = useUser();

  const [boardDetailQuery, boardLikesQuery, boardCommentQuery] = useQueries([
    {
      queryKey: ["boardDetail", boardId],
      queryFn: () => getBoardDetail(boardId + ""),
    },
    {
      queryKey: ["boardLikes", +boardId!, user?.id],
      queryFn: () => getBoardLikes(+boardId!, String(user?.id)),
    },
    {
      queryKey: ["boardComment", boardId],
      queryFn: () => getBoardComment(boardId + ""),
    },
  ]);

  const { data: postData, isLoading: postLoading } = boardDetailQuery;
  const { data: likeData, isLoading: likeLoading } = boardLikesQuery;
  const { data: commentData, isLoading: commentLoading } = boardCommentQuery;

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

  return (
    <>
      <div className="w-full space-y-2 bg-gray-100">
        <section className="p-6 bg-white rounded-lg shadow-md">
          <title className="flex items-center justify-between mb-4">
            {postLoading ? (
              <>
                <Skeleton height={40} width={200} />{" "}
                <Skeleton height={28} width={120} />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{postData?.data?.title}</h1>
                <span className="text-gray-600">#{postData?.data?.id}</span>
              </>
            )}
          </title>
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-600">
              {postLoading ? (
                <>
                  <Skeleton width={100} height={20} className="mr-2" />
                  <Skeleton width={150} height={20} />
                </>
              ) : (
                <>
                  <span className="mr-2">작성자: {postData?.data?.author}</span>
                  <span>작성일: {postData?.data?.createdAt}</span>
                </>
              )}
            </div>
            <div className="text-gray-500">
              {postLoading ? (
                <Skeleton width={150} height={20} />
              ) : (
                <span>수정일: {postData?.data?.updatedAt}</span>
              )}
            </div>
          </div>
          <div className="mb-1">
            {postLoading || likeLoading ? (
              <Skeleton width={50} height={20} />
            ) : (
              <>추천: {likeData?.data.likesLength ?? 0}</>
            )}
          </div>
          <div className="mb-4 space-x-4">
            <BoardLikeBtn
              boardId={Number(boardId)}
              userId={String(user?.id)}
              onLike={Boolean(likeData?.data.onLike)}
            />

            {user?.nickname === postData?.data?.author ? (
              <>
                <BoardEditBtn
                  boardId={+boardId!}
                  title={postData?.data.title!}
                  content={postData?.data.content!}
                  loading={postLoading}
                />
                <BoardDeleteBtn boardId={+boardId!} />
              </>
            ) : null}
          </div>
          <div className="mb-6 leading-relaxed text-gray-800">
            {postData?.data?.content}
          </div>
        </section>
        <section className={`${contentBoxStyle} space-y-4`}>
          <WriteComment />
        </section>
        <section className={`${contentBoxStyle} space-y-4`}>
          {commentData &&
            commentData?.code === 200 &&
            commentData?.data.length === 0 && (
              <div className="flex items-center justify-center py-8 border-4">
                <p className="font-semibold text-slate-500">
                  답글이 존재하지 않습니다. 답글을 달아주세요.
                </p>
              </div>
            )}
          {commentLoading && (
            <div className="space-y-2">
              {[
                ...Array.from(Array(3).keys()).map((item) => (
                  <div key={item}>
                    <Skeleton height={80} />
                  </div>
                )),
              ]}
            </div>
          )}
          {commentData &&
            pushDataToChidComments(commentData).map((comment) => (
              <BoardComment key={comment.id} {...comment} />
            ))}
        </section>
      </div>
    </>
  );
}
export default BoardDetail;
