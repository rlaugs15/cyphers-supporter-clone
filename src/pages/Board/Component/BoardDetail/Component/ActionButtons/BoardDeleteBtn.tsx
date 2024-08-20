import { useMutation, useQueryClient } from "react-query";
import { deleteBoard } from "../../../../../../api/boardApi";
import StyledButton from "../../../../../../components/Button/StyledButton";
import { useNavigate } from "react-router-dom";

interface BoardDeleteBtnProps {
  boardId: number;
}

function BoardDeleteBtn({ boardId }: BoardDeleteBtnProps) {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, data } = useMutation(deleteBoard, {
    onSuccess: () => {
      // onSuccess: (data, variables) 이런 식으로 각각 응답받는 데이터, muate에 전달한 데이터를 사용할 수도 있다.
      // 데이터를 새로고침
      queryClient.invalidateQueries("boardDetail");
      queryClient.invalidateQueries("boardList");
      nav("/board");
    },
  });

  const onDeleteClick = () => {
    if (isLoading) return;
    mutate(boardId);
  };
  return (
    <StyledButton
      onClick={onDeleteClick}
      color="red"
      text={data && data.code !== 200 ? "실패" : "삭제"}
    />
  );
}

export default BoardDeleteBtn;
