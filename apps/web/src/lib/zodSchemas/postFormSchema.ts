import { z } from "zod";

export const PostFormSchema = z.object({
  postId: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.coerce.number().int().positive().optional(),
  ),
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
