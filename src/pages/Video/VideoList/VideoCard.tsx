import { Video } from "@/api/videoApi";
import AvatarImg from "@/components/images/AvatarImg";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useVideoProgress } from "@/hooks/videoHooks/useVideoProgress";
import { formatRelativeTime } from "@/libs/videoUtils";
import { useState } from "react";
import ReactPlayer from "react-player";
import VideoTimeDisplay from "../Component/VideoTimeDisplay";
import VideoThumbnail from "../Component/VideoThumbnail";
import { useNavigate } from "react-router-dom";

type VideoCardProps = Video;

function VideoCard({
  id,
  authorId,
  title,
  url,
  thumbnail,
  author,
  views,
  uploadedAt,
}: VideoCardProps) {
  const [hoveredCard, setHoveredCard] = useState(false);

  const {
    played,
    duration,
    playerRef,
    handleProgress,
    handleDuration,
    seekTo,
  } = useVideoProgress();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMouseLeave = () => {
    setHoveredCard(false); // Hover 상태 초기화
    seekTo(0); // 비디오 재생 시간을 0으로 초기화
  };

  const nav = useNavigate();
  const navToMovieDetail = () => {
    nav(`${id}`, {
      state: {
        videoId: id,
        authorId,
        title,
        url,
        thumbnail,
        author,
        views,
        uploadedAt,
      },
    });
  };

  return (
    <div onClick={navToMovieDetail} className="border-none cursor-pointer">
      <CardContent
        className="relative p-0 overflow-hidden aspect-video rounded-xl bg-muted/50 bg-slate-200"
        onMouseEnter={() => setHoveredCard(true)} // Hover 시작 시 상태 업데이트
        onMouseLeave={handleMouseLeave} // Hover 종료 시 상태 초기화
      >
        {thumbnail ? <VideoThumbnail thumbnail={thumbnail} /> : null}
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={hoveredCard}
          muted={true}
          played={0.12}
          onProgress={({ played }) => handleProgress({ played })}
          onDuration={handleDuration}
        />
        <div className="absolute flex items-center justify-end w-full px-4 bottom-3">
          <VideoTimeDisplay>{formatTime(played * duration)}</VideoTimeDisplay>
        </div>
      </CardContent>
      <CardFooter className="flex items-start justify-start gap-4 p-4">
        <AvatarImg userAvatar size="10" />
        <div className="flex flex-col gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>
            <span>{author}</span>
            <div className="flex gap-2">
              <span>조회수 {views}회</span>
              <span>{formatRelativeTime(uploadedAt)}</span>
            </div>
          </CardDescription>
        </div>
      </CardFooter>
    </div>
  );
}

export default VideoCard;
