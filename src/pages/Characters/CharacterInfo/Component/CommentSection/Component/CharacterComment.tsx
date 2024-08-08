import AvatarImg from "../../../../../../components/images/AvatarImg";

interface CharacterCommentProps {
  characterId: string;
  userNickname: string;
  comment: string;
}

function CharacterComment({
  characterId,
  userNickname,
  comment,
}: CharacterCommentProps) {
  return (
    <article className="flex items-center p-3 space-x-2">
      <AvatarImg character id={characterId} size="10" />
      <div className="p-2 rounded-md bg-slate-200">
        <span className="font-semibold">{userNickname}</span>
        <p>{comment}</p>
      </div>
    </article>
  );
}

export default CharacterComment;
