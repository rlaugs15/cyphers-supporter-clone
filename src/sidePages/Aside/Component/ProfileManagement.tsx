import StyledButton from "@/components/Button/StyledButton";
import { useNavigate } from "react-router-dom";

function ProfileManagement() {
  const nav = useNavigate();

  return (
    <section>
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
  );
}

export default ProfileManagement;
