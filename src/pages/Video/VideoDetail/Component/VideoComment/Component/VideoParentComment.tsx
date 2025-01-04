import AvatarImg from "@/components/images/AvatarImg";
import { formatRelativeTime } from "@/libs/videoUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { VideoComment } from "@/api/videoApi";
import useUser from "@/hooks/useUser";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoReplyCommentList from "./VideoReplyCommentList";
import VideoDeleteBtn from "./Component/VideoDeleteBtn";

type VideoParentCommentProps = Omit<VideoComment, "parentCommId">;

function VideoParentComment({
  id,
  authorId,
  videoId,
  authorAvatar,
  nickname,
  comment,
  createdAt,
  replies,
}: VideoParentCommentProps) {
  const { user } = useUser();

  return (
    <div className="border-b-2 border-slate-300 last:border-b-0">
      <section className="flex items-center justify-between py-2 ">
        <div className="flex items-center justify-start space-x-2">
          <AvatarImg size="8" userAvatar userAvatarUrl={authorAvatar} />
          <section>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold">{nickname}</span>
              <time className="text-xs text-slate-400">
                {formatRelativeTime(createdAt)}
              </time>
            </div>
            <p>{comment}</p>
          </section>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {user?.id === authorId ? (
                <>
                  <VideoDeleteBtn videoId={videoId} commentId={id} />
                  <DropdownMenuSeparator />
                </>
              ) : null}
              <DropdownMenuItem>
                <span>답글 달기</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
}

export default VideoParentComment;
