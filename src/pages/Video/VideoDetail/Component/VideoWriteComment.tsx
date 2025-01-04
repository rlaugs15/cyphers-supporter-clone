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

interface VideoWriteCommentProps {
  user?: IUser;
}

function VideoWriteComment({ user }: VideoWriteCommentProps) {
  const form = useForm<videoCommentSchemaForm>({
    resolver: zodResolver(videoCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = ({ comment }: videoCommentSchemaForm) => {
    console.log("comment", comment);
    form.reset({ comment: "" });
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
