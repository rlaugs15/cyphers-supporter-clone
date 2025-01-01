import { useQuery } from "react-query";
import { getVideoCommentList, VideoCommentListResult } from "@/api/videoApi";
import VideoCommentSkeleton from "./Component/VideoCommentSkeleton";
import VideoParentComment from "./Component/VideoParentComment";

interface VideoCommentProps {
  videoId: number;
}

function VideoComment({ videoId }: VideoCommentProps) {
  const { isLoading, data } = useQuery<VideoCommentListResult>(
    ["videoCommentList", videoId],
    () => getVideoCommentList(videoId)
  );
  return (
    <>
      {isLoading ? (
        <VideoCommentSkeleton />
      ) : (
        data?.data.map((comment) => <VideoParentComment {...comment} />)
      )}
    </>
  );
}

export default VideoComment;
