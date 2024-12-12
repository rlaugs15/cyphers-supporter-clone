import { useState, useRef } from "react";
import ReactPlayer from "react-player";

export function useVideoProgress() {
  const [played, setPlayed] = useState(0); // 현재 재생 시간 비율 (0 ~ 1)
  const [duration, setDuration] = useState(0); // 총 재생 시간 (초 단위)
  const playerRef = useRef<ReactPlayer | null>(null); // ReactPlayer 참조

  const handleProgress = ({ played }: { played: number }) => {
    setPlayed(played);
  };

  const handleDuration = (newDuration: number) => {
    setDuration(newDuration);
  };

  const seekTo = (seconds: number) => {
    playerRef.current?.seekTo(seconds);
  };

  return {
    played,
    duration,
    playerRef,
    handleProgress,
    handleDuration,
    seekTo,
  };
}
