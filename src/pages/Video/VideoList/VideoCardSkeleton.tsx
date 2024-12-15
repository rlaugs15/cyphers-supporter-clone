import Skeleton from "react-loading-skeleton";

function VideoCardSkeleton() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, index) => (
        <div>
          <Skeleton key={index} height={160} />
          <article className="flex items-start justify-start gap-4 p-4">
            <Skeleton circle height={40} width={40} />
            <div className="flex flex-col gap-2">
              <Skeleton height={20} width={100} />
              <section>
                <Skeleton height={16} width={100} />
                <Skeleton height={16} width={200} />
              </section>
            </div>
          </article>
        </div>
      ))}
    </>
  );
}

export default VideoCardSkeleton;
