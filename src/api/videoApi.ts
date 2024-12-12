import { MutationResult } from "./../hooks/useUser";
import axios from "axios";

const PUBLIC_URL =
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
    video.url = PUBLIC_URL + prevUrl;
    return video;
  });
  return response.data;
}
