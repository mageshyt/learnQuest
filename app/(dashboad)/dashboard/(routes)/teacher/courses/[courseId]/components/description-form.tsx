"use client";
import React, { FC } from "react";

import * as z from "zod";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil, Sparkles, Undo, Undo2 } from "lucide-react";

import { Course } from "@prisma/client";

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

import { getCourseDescription } from "@/lib/ai-helper";
import { Editor } from "@/components/global/editor";
import { Preview } from "@/components/global/preview";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}
const DescriptionForm: FC<DescriptionFormProps> = ({
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
  const [description, setDescription] = React.useState({
    description: initialData.description || "",
    AiDescription: "",
  });

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof descriptionSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);

      router.refresh();
      toggleEdit();

      toast.success("Course updated");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    }
  };

  const generate = async () => {
    const res = await getCourseDescription(initialData.title);
    if (!res) return;
    // convert the md to html
    const parsed_result = markdownToHtml(res);
    console.log(parsed_result);
    setDescription({ ...description, AiDescription: parsed_result });
    form.setValue("description", parsed_result);

    form.trigger("description");

    toast.success("Description generated");
  };

  const undo = () => {
    form.setValue("description", description.description);
    setDescription({ ...description, AiDescription: "" });
    form.trigger("description");
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
          {/* undo */}
          {description.AiDescription && (
            <Button type="button" variant="ghost" size="icon" onClick={undo}>
              <Undo2 />
            </Button>
          )}
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
              {/* write with Ai */}
              <Button type="button" variant="outline" onClick={generate}>
                <Sparkles className="iconsmright" />
                Write with AI
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
