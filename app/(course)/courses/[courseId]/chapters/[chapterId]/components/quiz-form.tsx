"use client";
import React, { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { z } from "zod";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Gamepad } from "lucide-react";

const quizFormSchema = z.object({
  noOfQuestions: z.coerce.number().min(1),
  questionTypes: z.array(z.enum(["multiple choice", "true/false"])).min(1),
});

const QuizConfigForm: FC = ({}) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      noOfQuestions: 0,
      questionTypes: [],
    },
  });

  // ---------------------------------------state---------------------------------------
  const { isSubmitting, isValid } = form.formState;
  const OPTIONS: Option[] = [
    {
      label: "Multiple Choice",
      value: "multiple choice",
    },
    {
      label: "True/False",
      value: "true/false",
    },
  ];

  //   ---------------------------------------handlers---------------------------------------

  const handleSubmit = async (data: z.infer<typeof quizFormSchema>) => {
    try {
      console.log(data);
    } catch (err) {
      // Handle error
    }
  };
  return (
    <Form {...form}>
      <form
        className="mt-4 space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="noOfQuestions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={1} />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          name="questionTypes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Types</FormLabel>
              <MultipleSelector
                defaultOptions={OPTIONS}
                placeholder="Select question types"
                onChange={(options) =>
                  field.onChange(options.map((option) => option.value))
                }
                value={field.value.map((value) => {
                  return { label: value, value: value };
                })}
                emptyIndicator={
                  <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg">
          Start
          <Gamepad className="h-6 w-6 ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default QuizConfigForm;
