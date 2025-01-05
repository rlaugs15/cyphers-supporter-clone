import {
  postVideoCommentReply,
  PostVideoCommentReply,
  VideoCommentListResult,
  VideoReplyCommentResult,
} from "@/api/videoApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IUser } from "@/hooks/useUser";
import {
  videoCommentSchema,
  videoCommentSchemaForm,
} from "@/libs/zod/video-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

type INewComment = PostVideoCommentReply;

interface WriteVideoReplyCommentProps {
  user: IUser;
  videoId: number;
  parentId: number;
}

function WriteVideoReplyComment({
  user,
  videoId,
  parentId,
}: WriteVideoReplyCommentProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newComment: INewComment) => postVideoCommentReply(newComment),
    onMutate: async (newComment: INewComment) => {
      await queryClient.cancelQueries([
        "videoReplyCommentList",
        videoId,
        parentId,
      ]);

      const previousComment = queryClient.getQueryData<VideoReplyCommentResult>(
        ["videoReplyCommentList", videoId, parentId]
      );

      queryClient.setQueryData<VideoReplyCommentResult>(
        ["videoReplyCommentList", videoId, parentId],
        (old) => {
          const value = {
            id: new Date(),
            videoId,
            authorId: user.id,
            nickname: user.nickname,
            comment: newComment.body.comment,
            createdAt: "방금 전",
            parentCommId: parentId,
          };
          return {
            ...old,
            data: [
              {
                ...value,
              },
              ...(old?.data || []),
            ],
          } as VideoReplyCommentResult;
        }
      );
      return { previousComment };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(
        ["videoReplyCommentList", videoId, parentId],
        context?.previousComment
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        "videoReplyCommentList",
        videoId,
        parentId,
      ]);
    },
  });

  const form = useForm<videoCommentSchemaForm>({
    resolver: zodResolver(videoCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = ({ comment }: videoCommentSchemaForm) => {
    form.reset({ comment: "" });
    mutate({
      videoId,
      body: {
        authorId: user.id,
        nickname: user.nickname,
        authorAvatar: user.avatar,
        comment,
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start h-16 space-x-2"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-1 mt-[2px]">
              <FormControl>
                <Input
                  className="h-8"
                  disabled={!user}
                  placeholder={
                    user
                      ? "댓글을 입력해주세요."
                      : "로그인을 해야 댓글을 달 수 있습니다."
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="sm" variant="outline" type="submit" className="text-xs">
          댓글작성
        </Button>
      </form>
    </Form>
  );
}

export default WriteVideoReplyComment;
