import useUser from "../../hooks/useUser";
import { contentBoxStyle } from "../../libs/utils";
import { useMutation, useQueryClient } from "react-query";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";
import UserSection from "./Component/UserSection";
import ProfileManagement from "./Component/ProfileManagement";
import FindUserSection from "./Component/FindUserSection";
import NoticeDrawer from "./Component/NoticeDrawer";
import { MutationResult, setLogout } from "@/api/userApi";

function Aside() {
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
    onError: (_err, _, context) => {
      // 오류 발생 시 이전 상태로 복원
      queryClient.setQueryData(["member"], context?.previousLikes);
    },
    onSettled: (postId) => {
      // 성공, 실패 여부에 관계 없이 refetch(쿼리 무효화)
      queryClient.invalidateQueries(["liked", postId]);
    },
  });

  const onLogoutClick = useCallback(() => {
    if (logoutLoading) return;
    logoutMutate({});
  }, [logoutLoading, logoutMutate]);
  return (
    <div
      className={`w-[630px] hidden 2xl:block ${contentBoxStyle} flex flex-col h-full`}
    >
      <UserSection
        user={user}
        onLogoutClick={onLogoutClick}
        logoutLoading={logoutLoading}
      />
      {user ? <ProfileManagement /> : <FindUserSection />}
      <Separator className="my-4" />
      <NoticeDrawer />
    </div>
  );
}

export default Aside;
