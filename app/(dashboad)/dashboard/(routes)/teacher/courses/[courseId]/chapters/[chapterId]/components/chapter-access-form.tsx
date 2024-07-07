"use client";
import React, { FC } from "react";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

import { Chapter } from "@prisma/client";

import { chapterAccessForm } from "@/schema";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { updateChapter } from "@/actions/courses/chapters/update-chapter";
import { Preview } from "@/components/global/preview";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}
const ChapterAccessForm: FC<ChapterAccessFormProps> = ({
  initialData,
  courseId,
  chapterId,
}) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof chapterAccessForm>>({
    resolver: zodResolver(chapterAccessForm),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = React.useState(false);

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof chapterAccessForm>) => {
    try {
      const res = await updateChapter(chapterId, courseId, data);
      if ("error" in res && res) {
        return toast.error(res.error);
      }

      router.refresh();
      toggleEdit();
      toast.success("Course updated");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6   bg-slate-100 dark:bg-neutral-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Access
        <div className="flex items-center">
          <Button onClick={toggleEdit} variant={"ghost"}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                {" "}
                <Pencil className="iconsmright" />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2 italic",
            !initialData.isFree ? "text-neutral-500 dark:text-neutral-400" : ""
          )}
        >
          {initialData.isFree ? (
            <>This Chapter is free for preview</>
          ) : (
            <>This Chapter is not free for preview</>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="isFree"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row  items-start space-x-2 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>

                  <FormDescription className="space-y-1 leading-none">
                    check this box if you want to make this chapter free
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
// @ts-ignore
