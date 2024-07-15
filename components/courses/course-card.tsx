import { CourseWithProgressWithCategories } from "@/actions/general/get-courses";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "../global/icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string | null;
  chaptersLength: number;
  price: number | null;
  progress: number | null;
  category: string;
}
const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`} passHref>
      <div className="group bg-white dark:bg-neutral-900 hover:shadow-sm mt-4  transition overflow-hidden border rounded-lg  h-full">
        {/* image */}
        <div
          className="relative
        w-full aspect-video rounded-lg rounded-b-none overflow-hidden
        "
        >
          <Image
            fill
            src={imageUrl || "/placeholder.jpg"}
            alt={title}
            className="object-cover hover:scale-110 transition duration-300"
          />
        </div>

        {/* --------------------------------title and info------------------------------ */}

        <div className="flex flex-col p-3 pt-2">
          {/* title */}
          <div className="text-lg md:text-base font-medium  transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>

          <div className=" my-3 items-center gap-x-2 text-sm md:text-xs">
            {/* chapters info */}
            <div className="">
              <div className="bg-sky-100 text-sky-700 flex items-center w-fit gap-x-1 py-0.5 rounded-md px-4">
                {/* <IconBadge icon={BookOpen} size={"sm"} variant={"primary"} /> */}
                <BookOpen className=" w-4 h-4" />
                <span className=" text-sm">
                  {chaptersLength === 1
                    ? `${chaptersLength} chapter`
                    : `${chaptersLength} chapters`}
                </span>
              </div>
            </div>
          </div>

          {/* ------------- user progress------------- */}
          {progress && (
            <div className="flex items-center text-slate-500 gap-1">
              <IconBadge icon={BookOpen} size={"sm"} />
              <span>{progress}% completed</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
