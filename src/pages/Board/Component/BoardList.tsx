import { Link } from "react-router-dom";
import { contentBoxStyle } from "../../../libs/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { BoardListResult, getBoardList } from "../../../api";
import Skeleton from "react-loading-skeleton";

interface IForm {
  page: number;
}

function BoardList() {
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const { data: boardListData, isLoading: boardListLoading } =
    useQuery<BoardListResult>(
      ["boardList", page, size],
      () => getBoardList(page, size),
      {
        keepPreviousData: true, // 이전 데이터를 유지하여 페이지 전환 시 데이터 깜빡임 방지
      }
    );
  const totalPage = Number(boardListData?.data?.totalPages);

  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      page,
    },
  });

  const onMoveSubmit = ({ page }: IForm) => {
    if (page > totalPage) {
      setPage(totalPage - 1);
      setValue("page", totalPage);
    } else if (page <= 0) {
      setPage(0);
      setValue("page", 1);
    }
  };
  const onPrevClick = () => {
    if (boardListLoading) return;
    setPage((num) => num - 1);
  };

  const onNextClick = () => {
    if (boardListLoading) return;
    setPage((num) => num + 1);
  };

  useEffect(() => {
    setValue("page", page + 1);
  }, [page, setValue]);
  return (
    <div className={`${contentBoxStyle} container p-4 mx-auto`}>
      <h1 className="mb-6 text-3xl font-bold">게시판</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full text-sm leading-normal text-gray-600 uppercase bg-gray-200">
            <th className="px-6 py-3 text-center">번호</th>
            <th className="px-6 py-3 text-center">제목</th>
            <th className="px-6 py-3 text-center">작성자</th>
            <th className="px-6 py-3 text-center">등록일</th>
            <th className="px-6 py-3 text-center">추천</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {boardListLoading &&
            [...Array.from(Array(10).keys())].map((item) => (
              <tr key={item} className="w-full px-6 py-3 my-4 border-b">
                <td colSpan={5}>
                  <Skeleton height={32} className="w-full" />
                </td>
              </tr>
            ))}
          {boardListData?.data.posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-6 py-3 text-center">{post.id}</td>
              <td className="px-6 py-3 text-center">
                <Link
                  to={`/board/read/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-6 py-3 text-center">{post.author}</td>
              <td className="px-6 py-3 text-center">{post.createdAt}</td>
              <td className="px-6 py-3 text-center">{post.like || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={onPrevClick}
          disabled={page === 0}
          className="px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <form
          onSubmit={handleSubmit(onMoveSubmit)}
          className="flex items-center w-auto"
        >
          Page <input {...register("page")} className="w-10 text-center" /> of{" "}
          {boardListData?.data?.totalPages}
        </form>
        <button
          onClick={onNextClick}
          disabled={
            Number(boardListData?.data?.totalPages) ===
            Number(boardListData?.data?.currentPage) + 1
          }
          className="px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default BoardList;
