import axios from "axios";
import { handleAxiosError } from "../libs/handleAxiosError";
import { MutationResult } from "./userApi";

//게시글 조회
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  comments?: number[];
}

export interface BoardListResult extends MutationResult {
  data: {
    posts: Post[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  };
}

export async function getBoardList(page: number, size: number) {
  return handleAxiosError<BoardListResult>(
    axios
      .get("/api/v1/board", {
        params: {
          page,
          size,
        },
      })
      .then((res) => res.data)
  );
}

//게시글 상세 조회
export interface BoardDetailResult extends MutationResult {
  data: Post;
}

export async function getBoardDetail(boardId: string) {
  return handleAxiosError<BoardDetailResult>(
    axios.get(`/api/v1/board/${boardId}`).then((res) => res.data)
  );
}

//게시글 작성
export async function writeBoard(
  body: Pick<Post, "title" | "content" | "author">
) {
  return handleAxiosError<MutationResult>(
    axios.post("/api/v1/board", body).then((res) => res.data)
  );
}

//게시글 댓글 조회
export interface IBoardComment {
  id: number;
  userId: string;
  userNickname: string;
  parentCommentId?: number | null;
  childrenCommentsIds?: number[];
  content: string;
  createdAt: string;
}

export interface BoardCommentResult extends MutationResult {
  data: IBoardComment[];
}

export async function getBoardComment(boardId: string) {
  return handleAxiosError<BoardCommentResult>(
    axios.get(`/api/v1/comments/${boardId}`).then((res) => res.data)
  );
}
