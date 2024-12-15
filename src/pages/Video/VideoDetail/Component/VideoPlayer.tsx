import {
  addVideoViews,
  Video,
  VideoDetailResult,
  VideoListResult,
} from "@/api/videoApi";
import AvatarImg from "@/components/images/AvatarImg";
import Spinner from "@/components/images/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { formatRelativeTime } from "@/libs/videoUtils";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

interface VideoPlayerProps extends Omit<Video, "thumbnail"> {
  isLoading: boolean;
}

function VideoPlayer({
  isLoading,
  id,
  url,
  title,
  author,
  uploadedAt,
  views,
}: VideoPlayerProps) {
  const params = useParams();

  const [playing, setPlaying] = useState(false);
  const [buffer, setBuffer] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (videoId: number) => addVideoViews(videoId),
    onMutate: async (videoId) => {
      // 기존 캐시 취소, '쿼리 키'로 진행 중인 refetch 취소하여 낙관적 업데이트를 덮어쓰지 않도록 함
      await queryClient.cancelQueries(["videoDetail", videoId]);
      await queryClient.cancelQueries(["videoList", videoId]);

      // 이전 캐시 상태 가져오기
      const previousVideoDetail = queryClient.getQueryData<VideoDetailResult>([
        "videoDetail",
        videoId,
      ]);
      const previousVideoList = queryClient.invalidateQueries<VideoListResult>([
        "videoList",
        videoId,
      ]);

      // 캐시된 데이터를 낙관적 업데이트
      queryClient.setQueryData<VideoDetailResult>(
        ["videoDetail", videoId],
        (old) => {
          const oldViews = old?.data.views;
          return {
            ...old,
            data: {
              ...old?.data,
              views: Number(oldViews) + 1,
            },
          } as VideoDetailResult;
        }
      );

      queryClient.setQueryData<VideoListResult>(
        ["videoList", videoId],
        (old) => {
          const targetVideoIdx = old?.data.findIndex(
            (video) => video.id === Number(videoId)
          );
          const targetVideo = old?.data.find(
            (video) => video.id === Number(videoId)
          );
          if (targetVideo) {
            targetVideo.views += 1;
          }
          const prevVIdeos = old?.data.slice(0, targetVideoIdx) || [];
          const nextVIdeos = old?.data.slice(Number(targetVideoIdx) + 1) || [];
          const result = [...prevVIdeos, targetVideo, ...nextVIdeos];
          return {
            ...old,
            data: result,
          } as VideoListResult;
        }
      );

      // 오류 발생 시 되돌리기 위해 이전 상태 반환
      return { previousVideoDetail, previousVideoList };
    },
    onError: (_, videoId, context) => {
      // 오류 발생 시 이전 상태로 복원
      queryClient.setQueryData(
        ["videoDetail", videoId],
        context?.previousVideoDetail
      );
    },
    onSettled: (videoId) => {
      // 성공, 실패 여부에 관계 없이 refetch(쿼리 무효화)
      queryClient.invalidateQueries(["videoDetail", videoId]);
      queryClient.invalidateQueries(["videoList", videoId]);
    },
  });

  useEffect(() => {
    mutation.mutate(Number(id) || Number(params.videoId));
  }, []);
  return (
    <Card className="basis-3/4">
      <CardContent className="relative p-0 overflow-hidden aspect-video rounded-xl bg-muted/50 bg-slate-700">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          played={0.12}
          playing={playing}
          onPlay={() => setBuffer(false)}
          onBuffer={() => setBuffer(true)}
          controls
          onReady={() => setPlaying(true)}
        />
        {isLoading || buffer ? <Spinner /> : null}
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-start gap-4 p-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="flex gap-2">
          <AvatarImg userAvatar size="10" />
          <CardDescription>
            <span className="text-base font-semibold text-black">{author}</span>
            <div className="flex gap-2">
              <span>조회수 {views + 1}회</span>
              <span>{formatRelativeTime(uploadedAt)}</span>
            </div>
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
}

export default VideoPlayer;
