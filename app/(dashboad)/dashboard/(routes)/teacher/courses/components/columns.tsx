"use client";
import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import { Category, Chapter, Course } from "@prisma/client";
import { CellAction } from "./cell-action";
import { cn, formatPrice, HtmlToText, truncate } from "@/lib";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

// combine the corse tyoe and add category

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        {row.original.imageUrl && (
          <div className="size-16 relative">
            <Image
              src={row.original.imageUrl}
              alt={row.original.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div>
          <span className="text-sm font-medium">{row.original.title}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",

    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground line-clamp-2 w-56 ">
        {row.original.description ? (
          // truncate(HtmlToText(row.original.description), 80)
          HtmlToText(row.original.description)
        ) : (
          <>No description</>
        )}
      </span>
    ),
  },

  {
    accessorKey: "courseType",
    header: "Course Type",
    cell: ({ row }) => (
      <Badge variant={"outline"} className="">
        {row.original.courseType}
      </Badge>
    ),
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
    cell: ({ row }) => (
      <span className="text-sm  text-center text-muted-foreground">
        {row.original.price ? formatPrice(row.original.price) : "Free"}
      </span>
    ),
  },

  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          className="flex items-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowDownUp size={16} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        className={cn(
          "uppercase text-xs",
          row.original.isPublished ? "bg-emerald-500" : "bg-slate-500"
        )}
      >
        {row.original.isPublished ? "Published" : "Draft"}
      </Badge>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
