import { deleteVideoCommentList, VideoCommentListResult } from "@/api/videoApi";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "react-query";

interface DeleteCommentProps {
  videoId: number;
  commentId: number;
}

interface VideoDeleteBtnProps {
  videoId: number;
  commentId: number;
}

function VideoDeleteBtn({ videoId, commentId }: VideoDeleteBtnProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ videoId, commentId }: DeleteCommentProps) =>
      deleteVideoCommentList({ videoId, commentId }),
    onMutate: async ({ videoId, commentId }: DeleteCommentProps) => {
      await queryClient.cancelQueries(["videoCommentList", videoId]);

      const previousComment = queryClient.getQueryData<VideoCommentListResult>([
        "videoCommentList",
        videoId,
      ]);

      queryClient.setQueryData<VideoCommentListResult>(
        ["videoCommentList", videoId],
        (old) => ({
          ...old!,
          data: old!.data.filter((comm) => comm.id !== commentId),
        })
      );
      return { previousComment };
    },
    onError: (_error, { videoId }, context) => {
      queryClient.setQueryData(
        ["videoCommentList", videoId],
        context?.previousComment
      );
    },
    onSettled: ({ videoId }) => {
      queryClient.invalidateQueries(["videoCommentList", videoId]);
    },
  });

  const onDeleteClick = () => {
    mutation.mutate({ videoId, commentId });
  };
  return (
    <DropdownMenuItem onClick={onDeleteClick}>
      <span>댓글 삭제</span>
    </DropdownMenuItem>
  );
}
export default VideoDeleteBtn;
