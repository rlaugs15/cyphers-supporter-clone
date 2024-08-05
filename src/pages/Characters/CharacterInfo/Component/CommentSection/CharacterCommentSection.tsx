import useUser from "../../../../../hooks/useUser";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CharacterCommentResult,
  getCharacterComment,
  ICharacterComment,
} from "../../../../../api";
import CharacterComment from "./Component/CharacterComment";
import Skeleton from "react-loading-skeleton";
import CharacterCommentForm from "./Component/CharacterCommentForm";

type IForm = Omit<ICharacterComment, "characterId">;

interface CharacterCommentSectionProps {
  characterId: string;
}

function CharacterCommentSection({
  characterId,
}: CharacterCommentSectionProps) {
  const { user } = useUser();
  const { data: commentData, isLoading: commentLoading } =
    useQuery<CharacterCommentResult>(["characterComment", characterId], () =>
      getCharacterComment(characterId)
    );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => getCharacterComment(characterId),
    //newComment: useMutation의 mutate에 전달되는 값
    onMutate: async (newComment: ICharacterComment) => {
      await queryClient.cancelQueries([
        "characterComment",
        newComment.characterId,
      ]);

      const previousComment = queryClient.getQueryData<CharacterCommentResult>([
        "characterComment",
        newComment.characterId,
      ]);
      queryClient.setQueryData<CharacterCommentResult>(
        ["characterComment", newComment.characterId],
        (old) =>
          ({
            ...old,
            data: [
              ...(old?.data || []),
              {
                ...newComment,
              },
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

  const onCommentSubmit = ({ userId, userNickname, comment }: IForm) => {
    mutate({ userId, userNickname, comment, characterId });
  };

  return (
    <>
      <div className="flex items-center">
        <span className="text-2xl">코멘트</span>
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
          ? commentData?.data.map((champ) => (
              <CharacterComment
                key={champ.characterId}
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
