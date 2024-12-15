import { useQuery } from "react-query";
import { getVideoList, VideoListResult } from "@/api/videoApi";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";

function VideoList() {
  const { isLoading, data } = useQuery<VideoListResult>(
    ["videoList"],
    getVideoList
  );
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 ">
      <div className="grid gap-4 auto-rows-min md:grid-cols-3 ">
        {isLoading ? (
          <VideoCardSkeleton />
        ) : (
          data?.data.map((video) => <VideoCard key={video.id} {...video} />)
        )}
      </div>
    </div>
  );
}

export default VideoList;