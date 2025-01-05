import z from "zod";

export const videoSchema = z.object({
  id: z.number(),
  authorId: z.string(),
  userName: z.string(),
  authorAvatar: z.optional(z.string()),
  url: z.string(),
  thumbnail: z.string().optional(),
  title: z.string().max(20, { message: "제목은 50글자를 넘을 수 없습니다." }),
  author: z.string(),
  views: z.string(),
  uploadedAt: z.date(),
});

export const titleSchema = videoSchema.pick({
  title: true,
});

export type VideoSearchForm = z.infer<typeof titleSchema>;

export const videoCommentSchema = z.object({
  comment: z
    .string({
      required_error: "댓글 내용을 입력해주세요.",
    })
    .min(3, { message: "최소 3자 입력해주세요." })
    .max(200, { message: "200자 이하로 입력해주세요." }),
});

export type videoCommentSchemaForm = z.infer<typeof videoCommentSchema>;
