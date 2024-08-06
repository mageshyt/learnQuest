import { COURSE_TYPE } from "@prisma/client";
import { z } from "zod";

// ==================COURSE==================
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
  courseType: z.nativeEnum(COURSE_TYPE).default(COURSE_TYPE.FREE),
});

// ==================CHAPTER==================
export const createChapterForm = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const chapterAccessForm = z.object({
  isFree: z.boolean().default(false),
});

export const chapterVideoForm = z.object({
  videoUrl: z.string().min(1, {
    message: "Video URL is required",
  }),
});

// ==================QUIZ==================

export const quizFormSchema = z.object({
  noOfQuestions: z.coerce
    .number()
    .min(1, {
      message: "Number of questions is required",
    })
    .max(15, {
      message: "Maximum number of questions is 15",
    }),
  questionTypes: z.array(z.enum(["multiple choice", "true/false"])).min(1, {
    message: "At least one question type is required",
  }),

  difficulty: z.enum(["easy", "medium", "hard"]).default("easy"),
});
