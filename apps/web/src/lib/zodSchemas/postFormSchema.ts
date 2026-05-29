import { z } from "zod";

export const PostFormSchema = z.object({
  postId: z
    .string()
    .transform((val) => parseInt(val))
    .optional(),
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  tags: z
    .string()
    .min(1)
    .refine((val) => val.split(",").every((tag) => tag.trim() !== ""))
    .transform((val) => val.split(",")),
  thumbnail: z.instanceof(File).optional(),
  published: z.string().transform((val) => val === "on"),
});
