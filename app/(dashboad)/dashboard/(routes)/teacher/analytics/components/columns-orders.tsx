"use client";
import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";

import { formatPrice, timeAgo } from "@/lib";

import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { PurchaseWithCourseAndUser } from "@/actions/dashboard/get-recent-orders";
import UserAvatar from "@/components/global/user-avatar";

export const columns: ColumnDef<PurchaseWithCourseAndUser>[] = [
  {
    accessorKey: "course",
    header: "Course",

    cell: ({ row }) => {
      const { course } = row.original;
      return (
        <div className="flex items-center space-x-2">
          {course.imageUrl && (
            <div className="size-16 relative">
              <Image
                src={course.imageUrl}
                alt={course.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          )}
          <div>
            <span className="text-sm font-medium">{course.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Customer",

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
            fallback={user?.name?.[0] ?? "L"}
          />
          <div className="flex flex-col">
            <div className="font-medium">{row.original.user?.name}</div>
            <div className="text-xs">{row.original.user?.email}</div>
          </div>
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
          Purchase Date
          <ArrowDownUp size={16} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium text-muted-foreground">
          {timeAgo(new Date(row.original.createdAt))}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowDownUp size={16} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { course } = row.original;
      return (
        <span className="text-sm  text-center text-muted-foreground  font-medium">
          {course.price ? formatPrice(course.price) : "Free"}
        </span>
      );
    },
  },
];
