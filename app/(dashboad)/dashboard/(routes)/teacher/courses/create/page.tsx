"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import * as z from "zod";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCourseSchema } from "@/schema";

const CreateCoursePage = () => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  // ---------------------------------------state---------------------------------------

  const { isSubmitting, isValid } = form.formState;

  // ---------------------------------------handlers---------------------------------------

  const handleSubmit = async (data: z.infer<typeof createCourseSchema>) => {
    try {
      const res = await axios.post("/api/courses/", data);
      router.push(`/dashboard/teacher/courses/${res.data.id}`);
      toast.success("Course created");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto w-full flex flex-col md:items-center md:justify-center h-full">
      <div>
        <h1 className="text-2xl">Name Your Course</h1>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          What would you like to call your course? Don&apos;t worry, you can
          change
        </p>

        <Form {...form}>
          <form
            className="mt-6 space-y-8 "
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Introduction to JavaScript"
                    />
                  </FormControl>

                  <FormDescription>
                    What will students learn in your course?
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={"/"}>
                <Button type="button" variant={"ghost"}>
                  Cancel
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
