import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const descriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }).optional(),
});
