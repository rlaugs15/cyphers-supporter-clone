import axios from "axios";
import { handleAxiosError } from "../libs/handleAxiosError";
import { MutationResult } from "./userApi";

//게시글 조회
export interface Post {
  id: number;
  title: string;
  content: string;
  userAvatar?: string | null;
  author: string;
  like: number;
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
  data: Omit<Post, "like">;
}

export async function getBoardDetail(boardId: string) {
  return handleAxiosError<BoardDetailResult>(
    axios.get(`/api/v1/board/${boardId}`).then((res) => res.data)
  );
}

//게시글 작성
export async function writeBoard(
  body: Pick<Post, "title" | "content" | "author" | "userAvatar">
) {
  return handleAxiosError<MutationResult>(
    axios.post("/api/v1/board", body).then((res) => res.data)
  );
}

//게시글 수정
interface EditBoardProps {
  boardId: number;
  body: Pick<Post, "title" | "content">;
}

export async function editBoard({ boardId, body }: EditBoardProps) {
  return handleAxiosError<MutationResult>(
    axios.patch(`/api/v1/board/${boardId}`, body).then((res) => res.data)
  );
}

//게시글 삭제
export async function deleteBoard(boardId: number) {
  return handleAxiosError<MutationResult>(
    axios.delete(`/api/v1/board/${boardId}`).then((res) => res.data)
  );
}

//게시글 댓글 작성
export interface WriteCommentProps {
  boardId: number;
  data: {
    content: string;
    userId: string;
    userAvatar?: string;
    userNickname: string;
  };
}

export async function writeParentComment({ boardId, data }: WriteCommentProps) {
  return handleAxiosError<MutationResult>(
    axios
      .post(`/api/v1/board/comments/${boardId}`, data)
      .then((res) => res.data)
  );
}

//게시글 대댓글 작성
export interface WritechildrenCommentProps
  extends Omit<WriteCommentProps, "data"> {
  data: {
    content: string;
    userId: string;
    userAvatar?: string;
    userNickname: string;
    parentCommentId: number;
  };
}

export async function writechildrenComment({
  boardId,
  data,
}: WritechildrenCommentProps) {
  return handleAxiosError<MutationResult>(
    axios
      .post(`/api/v1/board/comments/reply/${boardId}`, data)
      .then((res) => res.data)
  );
}

//게시글 댓글 조회
export interface IBoardComment {
  id: number;
  userId: string;
  userAvatar?: string;
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

//댓글 삭제
interface DeleteBoardParentCommentProps {
  commentId: number;
  boardId: number;
}

export async function deleteBoardParentComment({
  commentId,
  boardId,
}: DeleteBoardParentCommentProps) {
  return handleAxiosError<MutationResult>(
    axios
      .delete(`/api/v1/comments/${commentId}`, {
        params: {
          boardId,
        },
      })
      .then((res) => res.data)
  );
}

//대댓글 삭제
interface DeleteBoardChildCommentProps extends DeleteBoardParentCommentProps {
  parentCommentId: number;
}

export async function deleteBoardChildComment({
  commentId,
  boardId,
  parentCommentId,
}: DeleteBoardChildCommentProps) {
  return handleAxiosError<MutationResult>(
    axios
      .delete(`/api/v1/comments/reply/${commentId}`, {
        params: {
          boardId,
          parentCommentId,
        },
      })
      .then((res) => res.data)
  );
}

//게시글 좋아요 조회
export interface ILike {
  boardId: number;
  loginId: string;
}

export interface GetBoardLikeResult extends MutationResult {
  data: {
    likesLength: number;
    onLike: boolean;
  };
}

export async function getBoardLikes(boardId: number, loginId: string) {
  return handleAxiosError<GetBoardLikeResult>(
    axios
      .get(`/api/v1/board/like/${boardId}`, {
        params: { loginId },
      })
      .then((res) => res.data)
  );
}

//게시글 좋아요 증가 및 감소 요청
export interface PostBoardLikesProps {
  boardId: number;
  body: Pick<ILike, "loginId">;
}

export async function postBoardLikes({ boardId, body }: PostBoardLikesProps) {
  return handleAxiosError<MutationResult>(
    axios.post(`/api/v1/board/like/${boardId}`, body).then((res) => res.data)
  );
}
