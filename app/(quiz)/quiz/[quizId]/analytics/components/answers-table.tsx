import { Question, userAnswerType } from "@/types/typings";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListView from "@/components/global/list-view";

interface AnswersTableProps {
  userAnswers: userAnswerType[];
  questions: Question[];
}

export const AnswersTable = ({ userAnswers, questions }: AnswersTableProps) => {
  return (
    <Table>
      {/* todo caption */}
      <TableCaption>
        A list of
        <span className="font-bold"> questions</span> and
        <span className="font-bold"> answers</span> with the number of
        <span className="font-bold"> attempts</span> made by the you.
      </TableCaption>
      {/* ----------------------------- TABLE ROW---------------------- */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Question & Answer</TableHead>

          <TableHead className="text-left">Explanation</TableHead>

          <TableHead className="hidden md:table-cell">Attempts</TableHead>
        </TableRow>
      </TableHeader>
      {/* ----------------------------- TABLE BODY---------------------- */}
      <TableBody>
        <ListView
          items={questions}
          render={(question, index) => (
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                {/* question */}

                <div>
                  <span className="font-bold italic">Q: </span>
                  {question.question}
                </div>

                <div className="mt-2">
                  <span className="font-bold italic">A: {question.answer}</span>
                </div>

                {/* answer */}
              </TableCell>
              <TableCell className="text-left">
                {question.explanation}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                {/* attempts */}
                {
                  userAnswers.filter(
                    (answer) => answer.question === question.question
                  ).length
                }
              </TableCell>
            </TableRow>
          )}
        />
      </TableBody>
    </Table>
  );
};
