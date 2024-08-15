import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import StyledButton from "../../../../../components/Button/StyledButton";
import CharacterComment from "./Component/CharacterComment";
import { contentBoxStyle } from "../../../../../libs/utils";
import CharacterCommentForm from "./Component/CharacterCommentForm";
import useUser from "../../../../../hooks/useUser";
import { ICharacterCommentForm } from "./CharacterCommentSection";
import {
  CharacterCommentResult,
  getInfiniteCharacterComments,
  ICharacterComment,
  setCharacterComment,
} from "../../../../../api/cyphersApi";

const PAGE_SIZE = 10;

interface InfiniteCommentResult {
  pageParams: any[];
  pages: CharacterCommentResult[];
}

function InfiniteCharacterComments() {
  const { user } = useUser();
  const { characterId } = useParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["infiniteCharacterComments", characterId],
      ({ pageParam = 0 }) =>
        getInfiniteCharacterComments(characterId!, pageParam, PAGE_SIZE),
      {
        getNextPageParam: (lastPage, allPages) => {
          // 수정된 부분: 실제 데이터 길이를 확인하고 다음 페이지 유무를 판단
          const morePagesExist = lastPage.data.length >= PAGE_SIZE;
          if (!morePagesExist) return undefined;
          return allPages.length; // 다음 페이지 번호를 반환
        },
      }
    );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newComment: ICharacterComment) =>
      setCharacterComment(newComment),
    //newComment: useMutation의 mutate에 전달되는 값
    onMutate: async (newComment: ICharacterComment) => {
      await queryClient.cancelQueries([
        "infiniteCharacterComments",
        newComment.characterId,
      ]);

      const previousComment = queryClient.getQueryData<InfiniteCommentResult>([
        "infiniteCharacterComments",
        newComment.characterId,
      ]);
      queryClient.setQueryData<InfiniteCommentResult>(
        ["infiniteCharacterComments", newComment.characterId],
        (old) =>
          ({
            ...old,
            pages: old?.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  data: [newComment, ...page.data],
                };
              }
            }),
          } as any)
      );
      return { previousComment };
    },
    onError: (_error, characterId, context) => {
      // 오류 발생 시 이전 상태로 복원
      queryClient.setQueryData(
        ["infiniteCharacterComments", characterId],
        context?.previousComment
      );
    },
    onSettled: (characterId) => {
      // 성공, 실패 여부에 관계 없이 refetch(쿼리 무효화)
      queryClient.invalidateQueries(["infiniteCharacterComments", characterId]);
    },
  });

  const onCommentSubmit = ({
    userId,
    userNickname,
    comment,
  }: ICharacterCommentForm) => {
    mutate({ userId, userNickname, comment, characterId } as ICharacterComment);
  };

  return (
    <div className={`${contentBoxStyle}`}>
      <div className="flex items-center">
        <span className="text-2xl">코멘트</span>
      </div>
      <CharacterCommentForm
        user={Boolean(user)}
        onCommentSubmit={onCommentSubmit}
      />
      <div>
        {data &&
          data.pages.map((page, index) =>
            page.data.map((comment) => (
              <CharacterComment
                key={`${comment.userId}-${index}`}
                characterId={comment.characterId}
                userNickname={comment.userNickname}
                comment={comment.comment}
              />
            ))
          )}
        <StyledButton
          color="black"
          onClick={() => fetchNextPage()}
          text={
            isFetchingNextPage
              ? "로딩 중..."
              : hasNextPage
              ? "다음 페이지"
              : "마지막 페이지입니다."
          }
          disabled={!hasNextPage || isFetchingNextPage}
        />
      </div>
    </div>
  );
}

export default InfiniteCharacterComments;
