"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Joystick, ShieldCheck } from "lucide-react";
import { AssetConstants, HtmlToText, QUIZ_IMAGE, random } from "@/lib";

import { Quiz } from "@prisma/client";

import QuizConfigForm from "./quiz-form";
import { quizFormSchema } from "@/schema";
import { z } from "zod";

import { generateQuizWithRetry } from "@/lib/ai-helper";
import { createQuiz } from "@/actions/quiz/create-quiz";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { AnimatedButton } from "@/components/ui/animated-button";

const STEPS = {
  INITIAL: 0,
  GENERATING: 1,
  QUESTION: 2,
  ERROR: 3,
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
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizConfig, setQuizConfig] = useState<z.infer<typeof quizFormSchema>>({
    noOfQuestions: 0,
    questionTypes: [],
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // -------------------------- Constants --------------------------

  const modelTitle = useMemo(() => {
    switch (step) {
      case STEPS.INITIAL:
        return "Generate Quiz 🎲";
      case STEPS.QUESTION:
        return "Questions ❓";

      case STEPS.GENERATING:
        return "Generating quiz...";

      case STEPS.ERROR:
        return "Oops! Something Went Wrong";
      default:
        return "Generate Quiz";
    }
  }, [step]);

  const modelDescription = useMemo(() => {
    switch (step) {
      case STEPS.INITIAL:
        return "Let’s create a quiz for this chapter. Get ready to test your knowledge!";
      case STEPS.GENERATING:
        return "We are crafting your quiz. This might take a moment, please be patient.";
      case STEPS.QUESTION:
        return "Answer the following questions.";

      case STEPS.ERROR:
        return "There was an issue generating the quiz.";
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
      setStep(STEPS.GENERATING);
      setLoading(true);
      const res = await generateQuizWithRetry(
        {
          title: title,
          description: HtmlToText(description),
          num_questions: config.noOfQuestions,
          question_types: config.questionTypes,
        },
        3
      );

      if (res.length === 0) {
        setStep(STEPS.ERROR);
        return;
      }

      // create the quiz

      const quiz = await createQuiz({
        title,
        chapterId,
        questions: res,
      });

      if ("error" in quiz) {
        setStep(STEPS.ERROR);

        return;
      }
      setQuiz(quiz);
      setStep(STEPS.QUESTION);

      // move to next step
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const navigateToQuestion = () => {
    if (quiz) {
      router.push(`/quiz/${quiz.id}/questions`);
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

  if (step === STEPS.GENERATING) {
    content = <Spinner loading={loading} type="grid" />;
  }

  if (step === STEPS.ERROR) {
    content = (
      <div className="space-y-4">
        <div className="relative aspect-square mb-4  h-64  w-full rounded-md">
          <Image
            src={AssetConstants.error}
            alt="quiz"
            fill
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        <p className="text-red-500 dark:text-red-400 text-center text-sm">
          An error occurred while generating the quiz. Please try again.
        </p>

        <AnimatedButton
          onClick={() => {
            setStep(STEPS.INITIAL);
          }}
          variant="danger"
          className="w-full bg-red-500"
        >
          Try Again
        </AnimatedButton>
      </div>
    );
  }

  if (step === STEPS.QUESTION) {
    content = (
      <div>
        {/* image */}

        <div className="relative aspect-square mb-4  h-64  w-full rounded-md">
          <Image
            src={random(QUIZ_IMAGE)}
            alt="quiz"
            fill
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* start now button */}

        <ResponsiveModalFooter>
          <AnimatedButton
            onClick={navigateToQuestion}
            variant="primary"
            className="w-full"
          >
            Start Now
            <Joystick className="h-6 w-6 ml-2" />
          </AnimatedButton>
        </ResponsiveModalFooter>
      </div>
    );
  }

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button className="bg-sky-500 text-white">
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
