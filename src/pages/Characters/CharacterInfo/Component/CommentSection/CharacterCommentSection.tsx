import useUser from "../../../../../hooks/useUser";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CharacterComment from "./Component/CharacterComment";
import Skeleton from "react-loading-skeleton";
import CharacterCommentForm from "./Component/CharacterCommentForm";
import { useNavigate } from "react-router-dom";
import {
  CharacterCommentResult,
  getCharacterComment,
  ICharacterComment,
  setCharacterComment,
} from "../../../../../api/cyphersApi";

export type ICharacterCommentForm = Omit<ICharacterComment, "characterId">;

interface CharacterCommentSectionProps {
  characterId: string;
}

function CharacterCommentSection({
  characterId,
}: CharacterCommentSectionProps) {
  const nav = useNavigate();
  const { user } = useUser();
  const { data: commentData, isLoading: commentLoading } =
    useQuery<CharacterCommentResult>(
      ["characterComment", characterId],
      () => getCharacterComment(characterId),
      {
        cacheTime: 0,
      }
    );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newComment: ICharacterComment) =>
      setCharacterComment(newComment),
    //newComment: useMutation의 mutate에 전달되는 값
    onMutate: async (newComment: ICharacterComment) => {
      // 기존 캐시 취소, '쿼리 키'로 진행 중인 refetch 취소하여 낙관적 업데이트를 덮어쓰지 않도록 함
      await queryClient.cancelQueries([
        "characterComment",
        newComment.characterId,
      ]);

      // 이전 캐시 상태 가져오기
      const previousComment = queryClient.getQueryData<CharacterCommentResult>([
        "characterComment",
        newComment.characterId,
      ]);

      // 캐시된 데이터를 낙관적 업데이트
      queryClient.setQueryData<CharacterCommentResult>(
        ["characterComment", newComment.characterId],
        (old) =>
          ({
            ...old,
            data: [
              {
                ...newComment,
              },
              ...(old?.data || []),
            ],
          } as CharacterCommentResult)
      );
      return { previousComment };
    },
    onError: (_error, characterId, context) => {
      // 오류 발생 시 이전 상태로 복원
      queryClient.setQueryData(
        ["characterComment", characterId],
        context?.previousComment
      );
    },
    onSettled: (characterId) => {
      // 성공, 실패 여부에 관계 없이 refetch(쿼리 무효화)
      queryClient.invalidateQueries(["characterComment", characterId]);
    },
  });

  const onCommentSubmit = ({
    userId,
    userNickname,
    comment,
  }: ICharacterCommentForm) => {
    mutate({ userId, userNickname, comment, characterId });
  };

  const onInfiniteCommentClick = () => {
    nav(`/character-comments/${characterId}`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-2xl">코멘트</span>
        <button
          onClick={onInfiniteCommentClick}
          className="relative flex items-center justify-center p-2 transition rounded-full hover:bg-slate-200 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 rounded-full custom-icon aspect-square bg-slate-500"
          >
            {/* 위쪽 삼각형 */}
            <path d="M12 4 L14 8 H10 L12 4 Z" />
            {/* 중간 4개의 선 */}
            <line x1="10" y1="10" x2="14" y2="10" />
            <line x1="10" y1="12" x2="14" y2="12" />
            <line x1="10" y1="14" x2="14" y2="14" />
            <line x1="10" y1="16" x2="14" y2="16" />
            {/* 아래쪽 삼각형 */}
            <path d="M12 20 L14 16 H10 L12 20 Z" />
          </svg>
          <figcaption className="absolute left-0 right-0 flex justify-center w-auto transition opacity-0 top-16 group-hover:opacity-100">
            <span
              style={{ whiteSpace: "nowrap" }}
              className="p-1 text-xs text-white rounded-sm bg-slate-600"
            >
              댓글 스크롤
            </span>
          </figcaption>
        </button>
      </div>
      <CharacterCommentForm
        user={Boolean(user)}
        onCommentSubmit={onCommentSubmit}
      />
      <section>
        {commentLoading
          ? [...Array.from(Array(4).keys())].map((item) => (
              <article key={item} className="flex items-center p-3 space-x-2">
                <Skeleton width={45} height={45} circle />
                <div className="p-2 rounded-md bg-slate-200">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={200} />
                </div>
              </article>
            ))
          : commentData?.data
          ? commentData?.data.map((champ, i) => (
              <CharacterComment
                key={`${champ.characterId}-${i}`}
                characterId={champ.characterId}
                userNickname={champ.userNickname}
                comment={champ.comment}
              />
            ))
          : null}
      </section>
    </>
  );
}

export default CharacterCommentSection;
