import { MutationResult } from "./../hooks/useUser";
import axios from "axios";

export const PUBLIC_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_PUBLIC_URL
    : import.meta.env.VITE_DEPLOY_PUBLIC_URL;

export interface Video {
  id: number;
  authorId: string;
  url: string;
  thumbnail?: string;
  title: string;
  author: string;
  views: number;
  uploadedAt: Date;
}

export interface VideoListResult extends MutationResult {
  data: Video[];
}

export async function getVideoList() {
  const response = await axios.get("/api/v1/video");
  response.data.data.forEach((video: Video) => {
    const prevUrl = video.url;
    video.url = `${PUBLIC_URL}videos/${prevUrl}`;
    return video;
  });
  return response.data;
}

export interface VideoDetailResult extends MutationResult {
  data: Video;
}

export async function getVideoDetail(videoId: number) {
  const response = await axios.get(`/api/v1/video/${videoId}`);
  const prevUrl = response.data.data.url;
  response.data.data.url = `${PUBLIC_URL}videos/${prevUrl}`;
  return response.data;
}

export async function addVideoViews(videoId: number) {
  const response = await axios.patch(`/api/v1/video/${videoId}/views`, {});
  return response.data;
}
