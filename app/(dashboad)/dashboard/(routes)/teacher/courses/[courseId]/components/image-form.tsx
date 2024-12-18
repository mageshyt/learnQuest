"use client";
import React, { FC } from "react";

import * as z from "zod";
import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { Course } from "@prisma/client";

import { imageUploadSchema } from "@/schema";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { FileUpload } from "@/components/global/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}
const ImageForm: FC<ImageFormProps> = ({ initialData, courseId }) => {
  // ---------------------------------------hooks---------------------------------------
  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const [isEditing, setIsEditing] = React.useState(false);

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof imageUploadSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);

      router.refresh();
      toggleEdit();
      toast.success("Course updated");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6   bg-slate-100 dark:bg-neutral-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="iconsmright" />
              Add Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="iconsmright" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60">
            <ImageIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imageUrl}
              alt="course image"
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChanges={(url) => {
              if (url) {
                handleSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ration recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
