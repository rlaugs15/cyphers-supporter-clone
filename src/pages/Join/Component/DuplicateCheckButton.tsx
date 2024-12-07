interface DuplicateCheckButtonProps {
  onClick: () => void;
  isLoading: boolean;
  label: string;
}

function DuplicateCheckButton({
  onClick,
  isLoading,
  label,
}: DuplicateCheckButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="px-4 py-2 mt-2 text-white bg-black rounded-md disabled:bg-gray-400"
    >
      {isLoading ? "확인 중..." : label}
    </button>
  );
}

export default DuplicateCheckButton;
