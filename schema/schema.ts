import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const descriptionSchema = z.object({
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .optional(),
});

export const imageUploadSchema = z.object({
  imageUrl: z.string().url({
    message: "Invalid URL",
  }),
});

export const attachmentForm = z.object({
  url: z.string().url({
    message: "Invalid URL",
  }),
});

export const categorySchema = z.object({
  categoryId: z.string().min(1),
});

export const priceFormSchema = z.object({
  price: z.coerce.number().min(1, {
    message: "Price is required",
  }),
});

export const createChapterForm = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});
