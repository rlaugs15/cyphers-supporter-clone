import {
  getVideoReplyCommentList,
  VideoReplyComment,
  VideoReplyCommentResult,
} from "@/api/videoApi";
import AvatarImg from "@/components/images/AvatarImg";
import { AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";
import { formatRelativeTime } from "@/libs/videoUtils";
import { useQuery } from "react-query";
import VIdeoReplyCommDeletBtn from "./Component/VIdeoReplyCommDeletBtn";

type VideoReplyCommentListProps = Pick<
  VideoReplyComment,
  "videoId" | "parentCommId"
>;

function VideoReplyCommentList({
  videoId,
  parentCommId,
}: VideoReplyCommentListProps) {
  const { user } = useUser();

  const { isLoading, data } = useQuery<VideoReplyCommentResult>(
    ["videoReplyCommentList", videoId, parentCommId],
    () => getVideoReplyCommentList(videoId, parentCommId)
  );
  return (
    <>
      {isLoading
        ? null
        : data?.data.map((comm) => (
            <AccordionContent>
              <section className="flex items-center justify-between py-2 ">
                <div className="flex items-center justify-start space-x-2">
                  <AvatarImg
                    size="8"
                    userAvatar
                    userAvatarUrl={comm.authorAvatar}
                  />
                  <section>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-semibold">
                        {comm.nickname}
                      </span>
                      <time className="text-xs text-slate-400">
                        {formatRelativeTime(comm.createdAt)}
                      </time>
                    </div>
                    <p>{comm.comment}</p>
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
                      {user?.id === comm.authorId ? (
                        <VIdeoReplyCommDeletBtn
                          videoId={videoId}
                          parentCommId={parentCommId}
                          replyCommId={comm.id}
                        />
                      ) : null}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </section>
            </AccordionContent>
          ))}
    </>
  );
}

export default VideoReplyCommentList;
