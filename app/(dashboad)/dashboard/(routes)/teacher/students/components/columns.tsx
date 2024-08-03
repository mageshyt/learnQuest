"use client";
import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import { Category, Chapter, Course, User } from "@prisma/client";

import { CellAction } from "./cell-action";
import UserAvatar from "@/components/global/user-avatar";
import { Badge } from "@/components/ui/badge";

type UserWithCourse = {
  user: User;
  course: Course;
};
export const columns: ColumnDef<UserWithCourse>[] = [
  {
    accessorFn: (row) => row.user.name,
    accessorKey:"username",
    header: "Student",

    cell: ({ row }) => {
      const { user } = row.original;

      return (
        <div className="flex items-center gap-2">
          <UserAvatar
            className="group-hover:scale-110 transition"
            imageUrl={
              (user?.attributes as any)?.has_image
                ? (user?.attributes as any)?.imageUrl
                : ""
            }
            alt="user avatar"
            fallback={user?.name?.[0] ?? "T"}
          />
          <div className="flex flex-col">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs">{user?.email}</div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "course",
    header: "Course Name",

    cell: ({ row }) => {
      const { course } = row.original;
      return (
        <div>
          <span className="text-sm font-medium">{course.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Course Type",
    cell: ({ row }) => (
      <Badge variant={"outline"} className="">
        {row.original.course.courseType}
      </Badge>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
