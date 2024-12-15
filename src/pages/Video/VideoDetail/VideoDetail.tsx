import { useLocation, useParams } from "react-router-dom";
import { getVideoDetail, VideoDetailResult } from "@/api/videoApi";
import { useQuery } from "react-query";
import VideoPlayer from "./Component/VideoPlayer";

function VideoDetail() {
  const params = useParams();

  const {
    state: { videoId, author, authorId, title, views, uploadedAt },
  } = useLocation();
  const { isLoading: videoLoading, data: videoData } =
    useQuery<VideoDetailResult>(["videoDetail"], () =>
      getVideoDetail(videoId || params.videoId)
    );

  return (
    <div className="flex bg-red-300">
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
      <section>side bar</section>
    </div>
  );
}

export default VideoDetail;
