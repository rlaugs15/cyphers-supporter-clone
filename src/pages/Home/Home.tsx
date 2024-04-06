import { useForm } from "react-hook-form";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

interface IForm {
  nickname: string;
}

function Home() {
  const nav = useNavigate();
  const match = useMatch("/:nickname");
  const { register, handleSubmit } = useForm<IForm>();
  const onPlayerSubmit = ({ nickname }: IForm) => {
    nav(`${nickname}`);
  };
  return (
    <div className="space-y-5 bg-green-300">
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <p className="text-2xl mb-7">플레이어 전적검색</p>
        <form
          onSubmit={handleSubmit(onPlayerSubmit)}
          className="flex h-10 ring-4 ring-black"
        >
          <input
            {...register("nickname", { required: true })}
            type="text"
            placeholder="검색할 플레이어의 닉네임을 입력하세요"
            required
            className="w-full h-full p-2"
          />
          <button className="w-20 h-full text-white bg-black">검색</button>
        </form>
        <div className="flex justify-end py-3 space-x-2 border-b-2 border-slate-200">
          <button className="px-3 py-1 bg-slate-200 rounded-2xl">
            검색기록 삭제
          </button>
          <button className="px-3 py-1 bg-slate-200 rounded-2xl">관리</button>
        </div>
      </div>
      <div className="p-3 space-y-3 bg-red-300 drop-shadow-md h-[330px]">
        {match ? <Outlet /> : null}
      </div>
    </div>
  );
}

export default Home;
