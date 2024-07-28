import { useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchHistory } from "../../../atoms";
import SearchHistory from "./SearchHistory";
import SearchInputBtn from "../../../components/Button/SearchInputBtn";
import { contentTitleStyle } from "../../../libs/utils";

interface IForm {
  nickname: string;
}

function Home() {
  const nav = useNavigate();
  const [search, setSearch] = useRecoilState(searchHistory);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onPlayerSubmit = ({ nickname }: IForm) => {
    setSearch((prev) => {
      const existArray = [
        ...prev,
        { firstName: nickname.charAt(0), fullName: nickname },
      ];

      return [...new Set(existArray)];
    });
    nav(`/${nickname}/mostcyall`);
    setValue("nickname", "");
  };

  return (
    <div className="space-y-5">
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <p className={`${contentTitleStyle}`}>플레이어 전적검색</p>
        <form
          onSubmit={handleSubmit(onPlayerSubmit)}
          className="flex h-10 ring-4 ring-black"
        >
          <SearchInputBtn
            register={register("nickname", { required: true })}
            text="검색할 플레이어의 닉네임을 입력하세요"
            required
          />
        </form>
        <SearchHistory nav={nav} search={search} setSearch={setSearch} />
      </div>
      <div className="p-3 space-y-8 bg-white drop-shadow-md h-[330px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
