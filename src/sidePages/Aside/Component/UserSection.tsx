import AvatarImg from "@/components/images/AvatarImg";
import { IUser } from "@/hooks/useUser";
import { contentBtnStyle } from "@/libs/utils";
import { useNavigate } from "react-router-dom";

interface UserSectionProps {
  user: IUser | undefined;
  onLogoutClick: () => void;
  logoutLoading: boolean;
}

function UserSection({ user, onLogoutClick, logoutLoading }: UserSectionProps) {
  const nav = useNavigate();

  return (
    <section>
      {user ? (
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-start justify-center">
            <span className="text-sm">환영합니다</span>
            <section className="flex items-center space-x-2">
              <AvatarImg userAvatar userAvatarUrl={user.avatar} size="8" />
              <span className="text-lg font-semibold">{user?.nickname} 님</span>
            </section>
          </div>
          <button
            onClick={onLogoutClick}
            className={`${contentBtnStyle}`}
            disabled={logoutLoading}
          >
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
          <button onClick={() => nav("/join")} className={`${contentBtnStyle}`}>
            회원가입
          </button>
        </div>
      )}
    </section>
  );
}

export default UserSection;
