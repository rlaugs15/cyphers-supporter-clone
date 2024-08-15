import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { contentBoxStyle, contentBtnStyle } from "../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import StyledButton from "../components/Button/StyledButton";
import { setLogout } from "../api/userApi";

function Aside() {
  const nav = useNavigate();
  const { user } = useUser();

  const queryClient = useQueryClient();
  const { mutate: logoutMutate, isLoading: logoutLoading } = useMutation(
    setLogout,
    {
      onSuccess: () => {
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
      {user ? (
        <section className={`${contentBoxStyle}`}>
          <details>
            <summary>프로필 관리</summary>
            <div className="grid grid-cols-1">
              <StyledButton
                onClick={() => nav("/user-profile/edit-profile")}
                color="black"
                text="회원정보 수정"
              />
              <StyledButton
                onClick={() => nav("/user-profile/change-password")}
                color="black"
                text="비밀번호 변경"
              />
              <StyledButton
                onClick={() => nav("/user-profile/quit-user")}
                color="black"
                text="회원 탈퇴"
              />
            </div>
          </details>
        </section>
      ) : null}
    </div>
  );
}

export default Aside;
