"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Question } from "@/types/typings";
import QuizConfigForm from "./quiz-form";
import { quizFormSchema } from "@/schema";
import { z } from "zod";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { generateQuizWithRetry } from "@/lib/ai-helper";

const STEPS = {
  INITIAL: 0,
  QUESTION: 1,
  RESULTS: 2,
};

interface QuizGeneratorProps {
  title: string;
  description: string;
  chapterId: string;
}

const QuizGenerator = ({
  title,
  description,
  chapterId,
}: QuizGeneratorProps) => {
  // -----------------State-----------------
  const [step, setStep] = useState(STEPS.INITIAL);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizConfig, setQuizConfig] = useState<z.infer<typeof quizFormSchema>>({
    noOfQuestions: 0,
    questionTypes: [],
  });
  const [loading, setLoading] = useState(false);

  // -------------------------- Constants --------------------------

  const modelTitle = useMemo(() => {
    switch (step) {
      case STEPS.INITIAL:
        return "Generate Quiz 🎲";
      case STEPS.QUESTION:
        return "Questions";
      case STEPS.RESULTS:
        return "Results";
      default:
        return "Generate Quiz";
    }
  }, [step]);

  const modelDescription = useMemo(() => {
    switch (step) {
      case STEPS.INITIAL:
        return "Generate a quiz for this chapter.";
      case STEPS.QUESTION:
        return "Answer the following questions.";
      case STEPS.RESULTS:
        return "Here are your results.";
      default:
        return "Generate a quiz for this chapter.";
    }
  }, [step]);

  // -----------------handlers-----------------
  const handleQuizConfigSubmit = async (
    config: z.infer<typeof quizFormSchema>
  ) => {
    try {
      // set quiz config
      setQuizConfig(config);

      setStep(STEPS.QUESTION);
      setLoading(true);
      const res = await generateQuizWithRetry(
        {
          chapter_description: description,
          chapter_title: title,
          num_questions: config.noOfQuestions,
          question_types: config.questionTypes,
        },
        3
      );

      console.log(res);
      // set questions
      setQuestions(res);

      // move to next step
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  //   -----------------ui-----------------

  let content;

  if (step === STEPS.INITIAL) {
    content = (
      <QuizConfigForm
        handleConfig={handleQuizConfigSubmit}
        initialConfig={quizConfig}
      />
    );
  }

  if (step === STEPS.QUESTION) {
    content = (
      <div>
        <Spinner loading={loading} type="grid" />
        {/* show details about the quiz */}
        <div className="text-sm text-muted-foreground text-right">
          total questions: {questions.length}
        </div>

        <p>TODO : show questions here</p>

        {/* show questions */}
      </div>
    );
  }

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button
          variant={"gooeyLeft"}
          className="bg-sky-600 dark:bg-sky-500 dark:text-white"
        >
          Test Yourself
          <ShieldCheck className="h-4 w-4 ml-2" />
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        {/* -----------------Header -----------------*/}
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>{modelTitle}</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            {modelDescription}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        {/* -----------------body-----------------*/}
        {content}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default QuizGenerator;
