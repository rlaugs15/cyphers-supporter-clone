import { titleSchema, VideoSearchForm } from "@/libs/zod/video-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function VideoNavBar() {
  const form = useForm<VideoSearchForm>({
    resolver: zodResolver(titleSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSearchubmit = ({ title }: VideoSearchForm) => {
    console.log(title);
  };

  return (
    <div className="flex justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSearchubmit)}
          className="flex justify-center overflow-hidden border rounded-3xl border-slate-300"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="검색"
                    className="px-6 rounded-none w-96"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="rounded-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default VideoNavBar;
