import z from "zod";

export const videoSchema = z.object({
  id: z.number(),
  authorId: z.string(),
  userName: z.string(),
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
