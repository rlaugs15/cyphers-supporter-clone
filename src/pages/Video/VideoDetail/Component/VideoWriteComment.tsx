import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contentBoxStyle } from "@/libs/utils";
import { IUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import {
  videoCommentSchema,
  videoCommentSchemaForm,
} from "@/libs/zod/video-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import {
  PostVideoComment,
  postVideoComment,
  VideoCommentListResult,
} from "@/api/videoApi";

type INewComment = PostVideoComment;

interface VideoWriteCommentProps {
  user?: IUser;
  videoId: number;
}

function VideoWriteComment({ user, videoId }: VideoWriteCommentProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newComment: INewComment) => postVideoComment(newComment),
    onMutate: async ({
      videoId,
      body: { authorId, authorAvatar, nickname, comment },
    }: INewComment) => {
      await queryClient.cancelQueries(["videoCommentList", videoId]);

      const previousComment = queryClient.getQueryData<VideoCommentListResult>([
        "videoCommentList",
        videoId,
      ]);

      queryClient.setQueryData<VideoCommentListResult>(
        ["videoCommentList", videoId],
        (old) => {
          const value = {
            id: new Date(),
            videoId,
            authorId,
            nickname,
            authorAvatar,
            comment,
            createdAt: "방금 전",
            replies: [],
          };
          return {
            ...old,
            data: [
              {
                ...value,
              },
              ...(old?.data || []),
            ],
          } as VideoCommentListResult;
        }
      );
      return { previousComment };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(
        ["videoCommentList", videoId],
        context?.previousComment
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["videoCommentList", videoId]);
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
    if (!user) return;
    mutate({
      videoId,
      body: {
        authorId: user?.id,
        authorAvatar: user?.avatar,
        nickname: user?.nickname,
        comment,
      },
    });
  };
  return (
    <div className={`${contentBoxStyle}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start h-16 space-x-2"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
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
          <Button type="submit">댓글작성</Button>
        </form>
      </Form>
    </div>
  );
}

export default VideoWriteComment;
