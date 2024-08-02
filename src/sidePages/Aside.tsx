import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { contentBoxStyle, contentBtnStyle } from "../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import { setLogout } from "../api";

function Aside() {
  const nav = useNavigate();
  const { user } = useUser();
  console.log("user", user);

  const queryClient = useQueryClient();
  const { mutate: logoutMutate, isLoading: logoutLoading } = useMutation(
    setLogout,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("member");
        queryClient.removeQueries("member");
      },
    }
  );

  const onLogoutClick = () => {
    if (logoutLoading) return;
    logoutMutate({});
  };
  return (
    <div className="w-[630px] hidden 2xl:block">
      <section className={`${contentBoxStyle}`}>
        {user ? (
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm">환영합니다</span>
              <span className="text-lg font-semibold">{user?.nickname} 님</span>
            </div>
            <button onClick={onLogoutClick} className={`${contentBtnStyle}`}>
              로그아웃
            </button>
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
