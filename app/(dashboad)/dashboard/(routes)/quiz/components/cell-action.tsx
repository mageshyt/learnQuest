"use client";

import React from "react";
import { Eye, MoreHorizontal, NotebookPen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Quiz, QuizResult } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: Quiz & {
    result: QuizResult | null;
  };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* write quiz if not completed*/}
        {data.result === null && (
          <DropdownMenuItem
            onClick={() => router.push(`/quiz/${data.id}/questions`)}
          >
            <NotebookPen className="size-4 mr-2" />
            Write Quiz
          </DropdownMenuItem>
        )}

        {/* view quiz Result */}
        <DropdownMenuItem
          disabled={data.result === null}
          onClick={() => router.push(`/quiz/${data.id}/analytics`)}
        >
          <Eye className="size-4 mr-2" />
          View Result
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
