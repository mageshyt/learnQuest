import { AUDIO_CONSTANTS, cn } from "@/lib";
import useSound from "use-sound";

import ListView from "@/components/global/list-view";

import { questionType, quizStatusType } from "@/types/typings";
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
  const [play] = useSound(AUDIO_CONSTANTS.select);
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
              onClick={() => {
                play();
                onSelect(index);
              }}
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
