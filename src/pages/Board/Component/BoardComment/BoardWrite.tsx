import { useForm } from "react-hook-form";
import { contentBoxStyle } from "../../../../libs/utils";
import { Post, writeBoard } from "../../../../api";
import useUser from "../../../../hooks/useUser";
import StyledButton from "../../../../components/Button/StyledButton";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type IForm = Pick<Post, "title" | "content">;

function BoardWrite() {
  const { user } = useUser("userOnly");
  const nav = useNavigate();
  const [wirteFail, setWriteFail] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, data } = useMutation(writeBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boardList");
      nav("/board");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onWriteSubmit = ({ title, content }: IForm) => {
    mutate({ title, content, author: user?.nickname! });
  };

  useEffect(() => {
    if (data && data.code !== 200) {
      setWriteFail(true);
      setTimeout(() => {
        setWriteFail(false);
      }, 2000);
    }
  }, [data, setWriteFail]);
  return (
    <div className={`${contentBoxStyle} space-y-4 relative`}>
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">글쓰기</h2>
        <table className="w-full table-fixed">
          <tr className="border-2">
            <th className="w-1/3 p-2 bg-slate-300" scope="col">
              아이디/닉네임
            </th>
            <td className="w-2/3 px-4 py-2 font-semibold">
              {user?.id} / {user?.nickname}
            </td>
          </tr>
        </table>
      </header>
      <main>
        <form
          onSubmit={handleSubmit(onWriteSubmit)}
          className="p-2 space-y-4 border-4"
        >
          <section className="flex flex-col items-start">
            <label
              htmlFor="title"
              className="flex items-center justify-center font-semibold"
            >
              제목:{" "}
              {errors?.title && (
                <span className="mt-1 text-sm font-medium text-red-500">
                  {errors?.title.message}
                </span>
              )}
            </label>
            <input
              {...register("title", {
                required: "제목은 필수입니다.",
                maxLength: {
                  value: 50,
                  message: "제목은 최대 50자까지 입력 가능합니다.",
                },
              })}
              id="title"
              type="text"
              className="w-full border-2"
            />
          </section>
          <section className="flex flex-col">
            <div>
              <label htmlFor="body" className="font-semibold">
                내용:{" "}
              </label>
              {errors?.content && (
                <span className="mt-1 text-sm text-red-500">
                  {errors?.content.message}
                </span>
              )}
            </div>
            <textarea
              {...register("content", {
                required: "내용을 입력해주세요.",
                maxLength: {
                  value: 2000,
                  message: "내용은 최대 2000자까지 입력 가능합니다.",
                },
              })}
              id="body"
              className="border-2 h-96"
            />
          </section>
          <div className="flex justify-center">
            <StyledButton color="black" text="작성하기" />
          </div>
        </form>
      </main>
      {wirteFail ? (
        <section className="absolute flex items-center justify-center h-32 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-md top-1/2 left-1/2 w-80">
          <p className="mt-1 text-sm text-red-500">{data?.message}</p>
        </section>
      ) : null}
    </div>
  );
}

export default BoardWrite;
