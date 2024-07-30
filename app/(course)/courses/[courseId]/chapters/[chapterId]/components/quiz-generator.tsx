"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Question } from "@/types/typings";
import QuizConfigForm from "./quiz-form";

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

  // -------------------------- Constants --------------------------
  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.INITIAL:
        return "Start";
      case STEPS.QUESTION:
        return "Submit";
      case STEPS.RESULTS:
        return "Finish";
      default:
        return "Next";
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    switch (step) {
      case STEPS.INITIAL:
        return "Cancel";
      case STEPS.QUESTION:
        return "Back";
      case STEPS.RESULTS:
        return "Back";
      default:
        return "Back";
    }
  }, [step]);

  const isLastStep = step === STEPS.RESULTS;

  // -----------------handlers-----------------
  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  //   -----------------ui-----------------

  let content;

  if (step === STEPS.INITIAL) {
    content = <QuizConfigForm />;
  }

  return (
    <Dialog open={true}>
      <DialogTrigger asChild>
        <Button variant={"gooeyLeft"} className="bg-sky-600">
          Test Yourself
          <ShieldCheck className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* -----------------Header -----------------*/}
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Generate a quiz for this chapter.
          </DialogDescription>
        </DialogHeader>

        {/* -----------------body-----------------*/}

        {content}

        {/* -----------------footer-----------------*/}

        {/* <DialogFooter>
          <Button
            variant={"ghost"}
            onClick={onBack}
            disabled={step === STEPS.INITIAL}
          >
            {secondaryActionLabel}
          </Button>

          <Button onClick={onNext} disabled={isLastStep}>
            {actionLabel}
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default QuizGenerator;
