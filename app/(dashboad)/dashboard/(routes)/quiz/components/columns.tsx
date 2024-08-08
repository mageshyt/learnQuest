"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Quiz, QuizResult } from "@prisma/client";

import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { dateFormat, getGradeImage, GRADE_CONSTANTS } from "@/lib";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

type QuizWithResult = Quiz & {
  result: QuizResult | null;
};

export const columns: ColumnDef<QuizWithResult>[] = [
  {
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => {
      const { title } = row.original;
      return (
        <div className="">
          <span className="text-sm font-medium line-clamp-2">{title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const { result } = row.original;
      const gradeImage = result?.score
        ? getGradeImage(result?.score)
        : GRADE_CONSTANTS.test;
      return (
        <div className="w-28 flex flex-col items-center">
          <div className="relative aspect-square size-12">
            <Image src={gradeImage} alt="Grade Image" fill />
          </div>

          <span
            className={`text-sm font-medium ${
              result?.score ? "text-primary" : "text-gray-400"
            }`}
          >
            {result?.score ? `${result?.score}%` : "Not Attempted"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowDownUp size={16} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <div>
          <span className="text-sm font-medium">
            {dateFormat(createdAt, "MMM dd, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isCompleted",
    header: "Status",
    cell: ({ row }) => {
      const { isCompleted } = row.original;
      return (
        <div>
          <Badge
            variant={isCompleted ? "success" : "default"}
            className="text-xs"
          >
            {isCompleted ? "Completed" : "In Progress"}
          </Badge>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
