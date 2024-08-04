import { useForm } from "react-hook-form";
import { ICharacterComment } from "../../../../../../api";

type IForm = Omit<ICharacterComment, "characterId">;

interface CharacterCommentFormProps {
  user: boolean;
  onCommentSubmit: (data: IForm) => void;
}

function CharacterCommentForm({
  user,
  onCommentSubmit,
}: CharacterCommentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const inputWatch = watch("comment", "");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 엔터 키 기본 동작 방지 (줄바꿈 방지)
      handleSubmit(onCommentSubmit)(); // 폼 제출
      reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onCommentSubmit)}
      className="flex flex-col w-full space-y-2"
    >
      {errors?.comment && errors.comment.type === "maxLength" && (
        <p className="font-semibold text-red-500">{errors?.comment.message}</p>
      )}
      <textarea
        {...register("comment", { required: true, maxLength: 200 })}
        required
        placeholder={
          user ? "캐릭터 코멘트 작성" : "로그인을 해야 작성할 수 있습니다."
        }
        className="p-3 border rounded-sm resize-none"
        rows={4}
        disabled={user ? false : true}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-between w-full">
        <p>{inputWatch.length}/200</p>
        <button className="flex items-center justify-center p-2 rounded-full w-9 h-9 bg-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-white size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default CharacterCommentForm;
