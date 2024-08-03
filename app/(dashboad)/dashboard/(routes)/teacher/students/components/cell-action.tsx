"use client";

import React from "react";
import { Clipboard, Copy, Eye, MoreHorizontal } from "lucide-react";
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
import { Course, User } from "@prisma/client";

interface CellActionProps {
  data: {
    user: User;
    course: Course;
  };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string, message: string) => {
    navigator.clipboard.writeText(id);
    toast.success(message, {
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

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => onCopy(data.user.id, "User ID copied to clipboard")}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy User Id
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Eye className="h-4 w-4 mr-2" />
          student profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            onCopy(data.course.id, "Course ID copied to clipboard")
          }
        >
          <Clipboard className="h-4 w-4 mr-2" />
          Copy course ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
