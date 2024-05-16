import { cls } from "../libs/utils";

interface LoadingProps {
  textWhite?: boolean;
}

function Loading({ textWhite = false }: LoadingProps) {
  return (
    <div
      className={cls(
        "flex items-center justify-center w-full h-full",
        textWhite ? "text-white" : ""
      )}
    >
      <span className="text-4xl font-semibold">로딩 중...</span>
    </div>
  );
}

export default Loading;
