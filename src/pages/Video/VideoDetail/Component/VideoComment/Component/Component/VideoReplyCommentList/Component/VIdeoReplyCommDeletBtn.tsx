import {
  deleteVideoReplyComment,
  DeleteVideoReplyCommentProps,
  VideoReplyCommentResult,
} from "@/api/videoApi";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "react-query";

interface VIdeoReplyCommDeletBtn {
  videoId: number;
  parentCommId: number;
  replyCommId: number;
}

function VIdeoReplyCommDeletBtn({
  videoId,
  parentCommId,
  replyCommId,
}: VIdeoReplyCommDeletBtn) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      videoId,
      parentCommId,
      replyCommId,
    }: DeleteVideoReplyCommentProps) =>
      deleteVideoReplyComment({ videoId, parentCommId, replyCommId }),
    onMutate: async ({
      videoId,
      parentCommId,
      replyCommId,
    }: DeleteVideoReplyCommentProps) => {
      await queryClient.cancelQueries([
        "videoReplyCommentList",
        videoId,
        parentCommId,
      ]);

      const previousComment = queryClient.getQueryData<VideoReplyCommentResult>(
        ["videoReplyCommentList", videoId, parentCommId]
      );

      queryClient.setQueryData<VideoReplyCommentResult>(
        ["videoReplyCommentList", videoId, parentCommId],
        (old) => ({
          ...old!,
          data: old!.data.filter((comm) => comm.id !== replyCommId),
        })
      );
      return { previousComment };
    },
    onError: (_error, { videoId, parentCommId }, context) => {
      queryClient.setQueryData(
        ["videoReplyCommentList", videoId, parentCommId],
        context?.previousComment
      );
    },
    onSettled: ({ videoId, parentCommId }) => {
      queryClient.invalidateQueries([
        "videoReplyCommentList",
        videoId,
        parentCommId,
      ]);
    },
  });

  const onDeleteClick = () => {
    mutation.mutate({ videoId, parentCommId, replyCommId });
  };
  return (
    <DropdownMenuItem onClick={onDeleteClick}>
      <span>댓글 삭제</span>
    </DropdownMenuItem>
  );
}

export default VIdeoReplyCommDeletBtn;
