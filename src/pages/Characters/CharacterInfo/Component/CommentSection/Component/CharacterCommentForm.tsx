import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ICharacterComment } from "../../../../../../api/cyphersApi";
import Textarea from "../../../../../../components/Textarea";

type IForm = Omit<ICharacterComment, "characterId">;

interface CharacterCommentFormProps {
  user: boolean;
  onCommentSubmit: (data: IForm) => void;
}

function CharacterCommentForm({ onCommentSubmit }: CharacterCommentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IForm>();
  const inputWatch = watch("comment", "");

  useEffect(() => {
    if (!isSubmitting) {
      setValue("comment", ""); // 폼이 제출될 때마다 comment 초기화
    }
  }, [isSubmitting, setValue]);
  return (
    <form
      onSubmit={handleSubmit(onCommentSubmit)}
      className="flex flex-col w-full space-y-2"
    >
      {errors?.comment && errors.comment.type === "maxLength" && (
        <p className="font-semibold text-red-500">{errors?.comment.message}</p>
      )}
      <Textarea
        register={register("comment", { required: true, maxLength: 200 })}
        handleSubmit={handleSubmit}
        onSubmit={onCommentSubmit}
        isSubmitting={isSubmitting}
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
