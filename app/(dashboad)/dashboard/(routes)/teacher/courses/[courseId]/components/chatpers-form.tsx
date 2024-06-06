"use client";
import React, { FC } from "react";

import * as z from "zod";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil, Sparkles, Undo, Undo2 } from "lucide-react";

import { Chapter, Course } from "@prisma/client";

import { createChapterForm } from "@/schema";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { getCourseDescription } from "@/lib/ai-heper";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { createCourseChapter } from "@/actions/courses/create-chapter";
import ChaptersList from "./chapters-list";
import { ReOrderCourseChapters } from "@/actions/courses/reorder-course-chapter";
import Loader from "@/components/global/loader";

interface ChaptersFormProps {
  initialData: Course & {
    chapters: Chapter[];
  };
  courseId: string;
}
const ChaptersForm: FC<ChaptersFormProps> = ({ initialData, courseId }) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof createChapterForm>>({
    resolver: zodResolver(createChapterForm),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const { isSubmitting, isValid } = form.formState;
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);

  //   ---------------------------------------handlers---------------------------------------

  const toggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  const handleSubmit = async (data: z.infer<typeof createChapterForm>) => {
    try {
      const res = await createCourseChapter(courseId, data.title);

      if (res?.error) {
        throw new Error(res.error);
      }

      router.refresh();
      toggleCreate();

      toast.success("Course updated");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    }
  };

  const onReadOrder = async (
    updateDate: { id: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);
      const res = await ReOrderCourseChapters(courseId, updateDate);
      if (res?.error) {
        throw new Error(res.error);
      }
      router.refresh();
      toast.success("Chapters reordered");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (chapterId: string) => {
    router.push(`/dashboard/routes/teacher/courses/${courseId}/chapters/${chapterId}`);
  };

  return (
    <div className="mt-6 relative  bg-slate-100 dark:bg-neutral-800 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full flex items-center justify-center w-full bg-slate-500/20 top-0 right-0 rounded-md">
          <Loader />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <div className="flex items-center">
          <Button onClick={toggleCreate} variant={"ghost"}>
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                {" "}
                <Pencil className="iconsmright" />
                Edit
              </>
            )}
          </Button>
          {/* undo */}
        </div>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. 'Chapter 1: Introduction to React'"
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2 ">
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                create
              </LoadingButton>
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2 ",
            !initialData.chapters.length &&
              "text-slate-500 italic dark:text-slate-400"
          )}
        >
          {!initialData.chapters.length && "No Chapters"}

          <ChaptersList
            onEdit={onEdit}
            onReadOrder={onReadOrder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Drag and drop chapters here to add them to the course
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;
