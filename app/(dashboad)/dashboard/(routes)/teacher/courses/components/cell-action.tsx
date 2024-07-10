"use client";

import React from "react";
import {
  Clipboard,
  Eye,
  MoreHorizontal,
  Pencil,
  PencilIcon,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: Course;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Payment ID copied to clipboard", {
      icon: "📋",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/teacher/courses/${data.id}`)}
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/courses/${data.id}`)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Clipboard className="h-4 w-4 mr-2" />
          Copy ID
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => {}} className="text-red-400">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
