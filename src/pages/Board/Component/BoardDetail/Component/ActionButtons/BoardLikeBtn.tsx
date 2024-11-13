import { useMutation, useQueryClient } from "react-query";
import {
  GetBoardLikeResult,
  postBoardLikes,
  PostBoardLikesProps,
} from "../../../../../../api/boardApi";
import StyledButton from "../../../../../../components/Button/StyledButton";
import useUser from "../../../../../../hooks/useUser";

interface BoardLikeBtnProns {
  boardId: number;
  userId: string;
  onLike: boolean;
}

function BoardLikeBtn({ boardId, userId, onLike }: BoardLikeBtnProns) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: likeMutate } = useMutation({
    mutationFn: (likeMutateData: PostBoardLikesProps) =>
      postBoardLikes(likeMutateData),
    onMutate: async () => {
      // 기존 캐시 취소, '쿼리 키'로 진행 중인 refetch 취소하여 낙관적 업데이트를 덮어쓰지 않도록 함
      await queryClient.cancelQueries(["boardLikes", boardId, userId]);

      // 이전 캐시 상태 가져오기
      const previousComment = queryClient.getQueryData<GetBoardLikeResult>([
        "boardLikes",
        boardId,
        userId,
      ]);

      if (!previousComment) return;

      // 캐시된 데이터를 낙관적 업데이트
      queryClient.setQueryData<GetBoardLikeResult>(
        ["boardLikes", boardId, userId],
        (old) => {
          if (!old) return previousComment;
          const checkonLike = old.data.onLike;
          const likeshResunt = checkonLike
            ? old.data.likesLength - 1
            : old.data.likesLength + 1;
          return {
            ...old,
            data: {
              likesLength: likeshResunt,
              onLike: checkonLike,
            },
          } as GetBoardLikeResult;
        }
      );
      return { previousComment };
    },
    onError: (_error, _, context) => {
      // 오류 발생 시 이전 상태로 복원
      queryClient.setQueryData(
        ["boardLikes", boardId, userId],
        context?.previousComment
      );
    },
    onSettled: () => {
      // 성공, 실패 여부에 관계 없이 refetch(쿼리 무효화)
      queryClient.invalidateQueries(["boardLikes", boardId, userId]);
      queryClient.invalidateQueries(["boardList"]);
    },
  });

  const onGoodClick = () => {
    likeMutate({
      boardId,
      body: { loginId: userId },
    });
  };
  return (
    <StyledButton
      onClick={onGoodClick}
      color="orange"
      text={onLike ? "추천취소" : "추천하기"}
      title={user ? "" : "로그인을 해야합니다."}
    />
  );
}

export default BoardLikeBtn;
