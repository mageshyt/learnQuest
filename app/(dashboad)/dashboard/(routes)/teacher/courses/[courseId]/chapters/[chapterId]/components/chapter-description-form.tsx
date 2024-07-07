"use client";
import React, { FC } from "react";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

import { Chapter } from "@prisma/client";

import { descriptionSchema } from "@/schema";
import { cn, markdownToHtml } from "@/lib";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Editor } from "@/components/global/editor";
import { updateChapter } from "@/actions/courses/chapters/update-chapter";
import { Preview } from "@/components/global/preview";
import { useModal } from "@/hooks/use-modal";
import ChapterDescriptionHelperModal from "@/components/modals/chapter-description-helper-modal";

interface ChapterDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
}
const ChapterDescriptionForm: FC<ChapterDescriptionFormProps> = ({
  initialData,
  courseId,
}) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = React.useState(false);

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof descriptionSchema>) => {
    try {
      const res = await updateChapter(initialData.id, courseId, data);
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
        Course Description
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
        <div>
          {initialData.description ? (
            <Preview value={initialData.description} />
          ) : (
            <p
              className={cn(
                "text-sm mt-2",
                !initialData.description && "text-slate-500 italic"
              )}
            >
              {"No description provided"}
            </p>
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
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/*  @ts-ignore */}
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>

              <ChapterDescriptionHelperModal
                chapterTitle={initialData.title}
                updateDescription={(description) => {
                  form.setValue("description", description);
                }}
              />
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
// @ts-ignore
