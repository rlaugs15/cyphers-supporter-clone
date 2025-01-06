import { useLocation, useParams } from "react-router-dom";
import { getVideoDetail, VideoDetailResult } from "@/api/videoApi";
import { useQuery } from "react-query";
import VideoPlayer from "./Component/VideoPlayer";
import VideoPlayerSkeleton from "./Component/VideoPlayerSkeleton";
import useUser from "@/hooks/useUser";
import VideoWriteComment from "./Component/VideoWriteComment";
import VideoComment from "./Component/VideoComment/VideoComment";

function VideoDetail() {
  const params = useParams();
  const { user } = useUser();
  const {
    state: { videoId, author, authorId, title, views, uploadedAt },
  } = useLocation();
  const { isLoading: videoLoading, data: videoData } =
    useQuery<VideoDetailResult>(["videoDetail", params.videoId], () =>
      getVideoDetail(videoId || params.videoId)
    );

  return (
    <div className="p-4">
      {videoLoading ? (
        <VideoPlayerSkeleton />
      ) : (
        <VideoPlayer
          isLoading={videoLoading}
          id={videoId || videoData?.data.id}
          authorId={authorId || videoData?.data.authorId}
          author={author || videoData?.data.author}
          title={title || videoData?.data.title}
          url={String(videoData?.data.url)}
          views={views || videoData?.data.views}
          uploadedAt={uploadedAt || videoData?.data.uploadedAt}
        />
      )}
      <section className="flex flex-col">
        <VideoWriteComment user={user} videoId={videoId} />
        <div className="flex flex-col w-full p-2">
          <VideoComment videoId={videoId} />
        </div>
      </section>
    </div>
  );
}

export default VideoDetail;
