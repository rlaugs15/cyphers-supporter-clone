import { defaultAvatarImgUrl } from "@/libs/userUtils";
import StyledButton from "../Button/StyledButton";

interface AvatarUploaderProps {
  imagePreview: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hiddenInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

function AvatarUploader({
  imagePreview,
  handleFileChange,
  hiddenInputRef,
}: AvatarUploaderProps) {
  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="avatar"
        className="flex items-center justify-center w-16 rounded-full aspect-square"
      >
        <img
          className="object-cover w-16 rounded-full aspect-square"
          src={imagePreview || defaultAvatarImgUrl}
          alt="avatar preview"
        />
        <input
          type="file"
          accept="image/*"
          id="avatar"
          onChange={handleFileChange}
          ref={hiddenInputRef}
          className="hidden"
        />
      </label>
      <StyledButton
        color="black"
        text="이미지 변경하기"
        onClick={() => hiddenInputRef.current?.click()}
      />
    </div>
  );
}

export default AvatarUploader;
