import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from "react-hook-form";
import useUser from "../hooks/useUser";

interface TextareaProps {
  register: UseFormRegisterReturn;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  [key: string]: any;
}

function Textarea({
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  ...rest
}: TextareaProps) {
  const { user } = useUser();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 엔터 키 기본 동작 방지 (줄바꿈 방지)
      if (!isSubmitting) {
        handleSubmit(onSubmit)(); // 폼 제출
      }
    }
  };
  return (
    <textarea
      {...register}
      required
      placeholder={user ? "코멘트 작성" : "로그인을 해야 작성할 수 있습니다."}
      className="w-full p-3 border rounded-sm resize-none"
      rows={4}
      disabled={!user}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}

export default Textarea;
