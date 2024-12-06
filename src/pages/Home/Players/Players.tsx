import { useForm } from "react-hook-form";
import SearchInputBtn from "../../../components/Button/SearchInputBtn";
import { Outlet, useNavigate } from "react-router-dom";
import { contentTitleStyle } from "../../../libs/utils";

interface IForm {
  nicknames: string;
}

function Players() {
  const nav = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onPlayersSubmit = ({ nicknames }: IForm) => {
    const cleanedNicknames = nicknames.replace(/\s+/g, "").split(",");
    nav(
      `playersinfo?player1=${cleanedNicknames[0]}&player2=${cleanedNicknames[1]}`
    );
    setValue("nicknames", "");
  };
  return (
    <div className="space-y-5">
      <div className="p-3 space-y-3 bg-white drop-shadow-md">
        <p className={`${contentTitleStyle}`}>플레이어 전적검색</p>
        <form
          onSubmit={handleSubmit(onPlayersSubmit)}
          className="flex h-10 ring-4 ring-black"
        >
          <SearchInputBtn
            register={register("nicknames", { required: true })}
            text=",로 구분하여 플레이어의 닉네임을 입력하세요 ex) 라팜,한모금"
            required
          />
        </form>
      </div>
      <div className="grid h-auto grid-cols-2 gap-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Players;
