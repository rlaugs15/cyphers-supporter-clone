import { cls } from "@/libs/utils";

interface VideoTimeDisplayProps {
  clssName?: string;
  children: React.ReactNode;
}

function VideoTimeDisplay({ children, clssName = "" }: VideoTimeDisplayProps) {
  return (
    <time
      className={cls(
        "flex items-center justify-center w-8 text-sm text-white  rounded-sm ",
        clssName
      )}
    >
      {children}
    </time>
  );
}

export default VideoTimeDisplay;
