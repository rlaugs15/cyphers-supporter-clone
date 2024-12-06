import StyledButton from "@/components/Button/StyledButton";
import { useNavigate } from "react-router-dom";

function FindUserSection() {
  const nav = useNavigate();

  return (
    <section>
      <details>
        <summary>로그인ID / PW 찾기</summary>
        <div className="grid grid-cols-1">
          <StyledButton
            onClick={() => nav("/find-user-profile/loginId")}
            color="black"
            text="로그인ID 찾기"
          />
          <StyledButton
            onClick={() => nav("/find-user-profile/password")}
            color="black"
            text="비밀번호 찾기"
          />
        </div>
      </details>
    </section>
  );
}

export default FindUserSection;
