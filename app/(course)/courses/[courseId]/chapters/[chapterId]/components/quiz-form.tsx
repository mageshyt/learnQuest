"use client";
import React, { FC } from "react";

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

import { z } from "zod";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Flame, Gamepad } from "lucide-react";
import { quizFormSchema } from "@/schema";
import { AnimatedButton } from "@/components/ui/animated-button";

interface QuizConfigFormProps {
  handleConfig: (config: z.infer<typeof quizFormSchema>) => void;
  initialConfig?: z.infer<typeof quizFormSchema>;
}

const QuizConfigForm = ({
  handleConfig,
  initialConfig,
}: QuizConfigFormProps) => {
  // ---------------------------------------hooks---------------------------------------
  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: initialConfig || {
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
      handleConfig(data);
    } catch (err) {
      console.error(err);
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
              <FormDescription>
                You can chose how many questions you want to generate. The
              </FormDescription>
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
              <FormDescription>
                Select the desired question types for the quiz.
              </FormDescription>
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
                  <p className="text-center text-sm  text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <AnimatedButton
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting || !isValid}
        >
          Generate Quiz
          <Flame className="h-6 w-6 ml-2" />
        </AnimatedButton>
      </form>
    </Form>
  );
};

export default QuizConfigForm;
