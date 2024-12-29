import Skeleton from "react-loading-skeleton";

function VideoPlayerSkeleton() {
  return (
    <div className="basis-3/4">
      <div className="relative p-0 overflow-hidden aspect-video rounded-xl bg-muted/50 bg-slate-700">
        <Skeleton height="100%" width="100%" />
      </div>
    </div>
  );
}

export default VideoPlayerSkeleton;
