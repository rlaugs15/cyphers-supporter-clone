import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { contentBoxStyle, contentBtnStyle } from "../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import StyledButton from "../components/Button/StyledButton";
import { MutationResult, setLogout } from "../api/userApi";

function Aside() {
  const nav = useNavigate();
  const { user } = useUser();

  const queryClient = useQueryClient();

  const { mutate: logoutMutate, isLoading: logoutLoading } = useMutation({
    mutationFn: (newComment: {}) => setLogout(newComment),
    onMutate: async () => {
      // 기존 캐시 취소, '쿼리 키'로 진행 중인 refetch 취소하여 낙관적 업데이트를 덮어쓰지 않도록 함
      await queryClient.cancelQueries(["member"]);

      // 이전 캐시 상태 가져오기
      const previousLikes = queryClient.getQueryData<MutationResult>([
        "member",
      ]);

      // 캐시된 데이터를 낙관적 업데이트
      queryClient.setQueryData(["member"], () => undefined);

      // 오류 발생 시 되돌리기 위해 이전 상태 반환
      return { previousLikes };
    },
    onError: (err, _, context) => {
      // 오류 발생 시 이전 상태로 복원
      queryClient.setQueryData(["member"], context?.previousLikes);
    },
    onSettled: (postId) => {
      // 성공, 실패 여부에 관계 없이 refetch(쿼리 무효화)
      queryClient.invalidateQueries(["liked", postId]);
    },
  });

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
      ) : (
        <section className={`${contentBoxStyle}`}>
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
      )}
    </div>
  );
}

export default Aside;
