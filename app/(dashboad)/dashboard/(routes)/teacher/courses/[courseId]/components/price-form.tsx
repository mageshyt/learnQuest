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

import { priceFormSchema } from "@/schema";
import { cn, formatPrice } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}
const PriceForm: FC<PriceFormProps> = ({ initialData, courseId }) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof priceFormSchema>>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: initialData.price || 0,
      courseType: initialData.courseType || "FREE",
    },
  });

  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = React.useState(false);

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof priceFormSchema>) => {
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
    <div className="mt-6   bg-slate-100  dark:bg-neutral-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Price
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
      {!isEditing && initialData.courseType === "FREE" && <Badge>Free</Badge>}
      {!isEditing && initialData.courseType === "PAID" && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {formatPrice(initialData.price || 0) || "No price"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="courseType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FREE">Free</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            {/* if it paid how the input to enter price */}
            {form.watch("courseType") === "PAID" && (
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="number" min={1} />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            )}
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

export default PriceForm;
