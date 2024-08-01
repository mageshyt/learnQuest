import ListView from "@/components/global/list-view";
import { cn } from "@/lib";
import { questionType, quizStatusType } from "@/types/typings";
import React from "react";
import OptionCard from "./option-card";

interface QuestionOptionsProps {
  options: string[];
  onSelect: (id: number) => void;
  status: quizStatusType;
  selectedOption: number | null;
  disabled?: boolean;
  type: questionType;
}

const QuestionOptions = ({
  options,
  onSelect,
  selectedOption,
  status,
  type,
  disabled,
}: QuestionOptionsProps) => {
  return (
    <div className={cn("grid gap-2 md:grid-cols-2 grid-cols-1  ")}>
      {options && (
        <ListView
          items={options}
          render={(option, index) => (
            <OptionCard
              id={index}
              text={option}
              shortcut={`${index + 1}`}
              status={status}
              onClick={() => onSelect(index)}
              selected={selectedOption === index}
              disabled={disabled}
            />
          )}
        />
      )}
    </div>
  );
};

export default QuestionOptions;