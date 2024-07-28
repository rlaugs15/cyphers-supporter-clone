import { useForm } from "react-hook-form";
import AvatarImg from "../../../../../components/images/AvatarImg";

interface IForm {
  comment: string;
}

function CommentSection() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();
  const inputWatch = watch("comment", "");
  const onCommentSubmit = () => {};

  return (
    <>
      <div className="flex items-center space-x-3">
        <span className="text-2xl">코멘트</span>
        {errors?.comment && errors.comment.type === "maxLength" && (
          <p className="font-semibold text-red-500">
            {errors?.comment.message}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onCommentSubmit)}
        className="flex flex-col w-full space-y-2"
      >
        <textarea
          {...register("comment", { required: true, maxLength: 200 })}
          required
          placeholder="캐릭터 코멘트 작성"
          className="p-3 border rounded-sm resize-none"
          rows={4}
        />
        <div className="flex justify-between w-full">
          <p>{inputWatch.length}/200</p>
          <button className="flex items-center justify-center p-2 rounded-full w-9 h-9 bg-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
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
      <section>
        {[...Array.from(Array(5).keys())].map((item) => (
          <article key={item} className="flex items-center p-3 space-x-2">
            <AvatarImg id="c603a74ba02374026a535dc53e5b8d40" size="10" />
            <div className="p-2 rounded-md bg-slate-200">
              <span className="font-semibold">이름</span>
              <p>
                댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default CommentSection;
