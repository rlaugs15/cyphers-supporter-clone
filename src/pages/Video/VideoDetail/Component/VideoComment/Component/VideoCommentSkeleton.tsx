import Skeleton from "react-loading-skeleton";

function VideoCommentSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <article
          key={index}
          className="flex items-center justify-between py-2 border-b-2 border-slate-300 last:border-b-0"
        >
          <div className="flex items-center justify-start space-x-2">
            <Skeleton circle height={32} width={32} />
            <section>
              <div className="flex items-center justify-start space-x-2">
                <Skeleton width={50} height={16} />
                <Skeleton width={40} height={14} />
              </div>
              <Skeleton height={14} width={400} />
            </section>
          </div>
          <Skeleton height={20} width={10} />
        </article>
      ))}
    </>
  );
}

export default VideoCommentSkeleton;
