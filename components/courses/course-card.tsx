import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookOpen } from "lucide-react";
import { CourseProgress } from "@/components/global/course-progress";
import { Badge } from "../ui/badge";

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
      <div className=" p-3 bg-white dark:bg-neutral-900 hover:shadow-sm  transition overflow-hidden border rounded-xl  h-full">
        <div className="group">
          {/* image */}

          <div className=" relative">
            <Badge
              variant={"outline"}
              className="absolute z-[2] top-3 left-3 transition-all duration-200 group-hover:top-0 group-hover:left-0  group-hover:rounded-l-none group-hover:rounded-t-none bg-accent group-hover:border-0 group-hover:pl-1 group-hover:px-3 group-hover:py-[4px] group-hover:rounded-br-xl"
            >
              {category}
            </Badge>

            <div className="relative max-h-[250px] select-none w-full aspect-video rounded-xl overflow-hidden ">
              <Image
                fill
                src={imageUrl || "/placeholder.jpg"}
                alt={title}
                className="object-cover hover:scale-110    transition duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/* --------------------------------title and info------------------------------ */}

        <div className="flex flex-col pt-2">
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
          {progress !== null && (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          )}
        </div>
        <div />
      </div>
    </Link>
  );
};

export default CourseCard;
