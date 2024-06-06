"use client";
import React, { FC } from "react";

import * as z from "zod";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

import { Course } from "@prisma/client";

import { categorySchema } from "@/schema";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}
const CategoryForm: FC<CategoryFormProps> = ({
  initialData,
  courseId,
  options,
}) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });

  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = React.useState(false);

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );
  console.log(options);
  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof categorySchema>) => {
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
  return (
    <div className="mt-6   bg-slate-100 dark:bg-neutral-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
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
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption ? selectedOption.label : "No category selected"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      {...field}
                      value={field.value}
                      options={options}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage {...field} />
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

export default CategoryForm;
