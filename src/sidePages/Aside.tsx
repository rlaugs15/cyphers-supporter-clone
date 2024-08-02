import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { contentBoxStyle, contentBtnStyle } from "../libs/utils";

function Aside() {
  const { user } = useUser();
  console.log("user", user);

  const nav = useNavigate();
  return (
    <div className="w-[630px] hidden 2xl:block">
      <section className={`${contentBoxStyle}`}>
        {user ? (
          <div className="flex flex-col items-start justify-center">
            <span className="text-sm">환영합니다</span>
            <span className="text-lg font-semibold">{user?.nickname} 님</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 space-x-2">
            <button
              onClick={() => nav("/login")}
              className={`${contentBtnStyle}`}
            >
              로그인
            </button>
            <button
              onClick={() => nav("/join")}
              className={`${contentBtnStyle}`}
            >
              회원가입
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Aside;
