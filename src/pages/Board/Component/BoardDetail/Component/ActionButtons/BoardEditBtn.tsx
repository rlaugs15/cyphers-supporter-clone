import { useNavigate } from "react-router-dom";
import StyledButton from "../../../../../../components/Button/StyledButton";

interface BoardEditBtnProps {
  loading: boolean;
  boardId: number;
  title: string;
  content: string;
}

function BoardEditBtn({ loading, boardId, title, content }: BoardEditBtnProps) {
  const nav = useNavigate();

  const onEditClick = () => {
    if (loading) return;
    nav(`/board/edit/${boardId}`, {
      state: {
        title,
        content,
      },
    });
  };
  return <StyledButton onClick={onEditClick} color="blue" text="수정" />;
}

export default BoardEditBtn;
