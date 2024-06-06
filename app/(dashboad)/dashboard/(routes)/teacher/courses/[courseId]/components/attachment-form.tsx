"use client";
import React, { FC } from "react";

import * as z from "zod";
import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { File, ImageIcon, Pencil, PlusCircle, Trash, X } from "lucide-react";

import { Attachment, Course } from "@prisma/client";

import { attachmentForm } from "@/schema";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { FileUpload } from "@/components/global/file-upload";
import { createCourseAttachment } from "@/actions/courses/create-attachments";
import ListView from "@/components/global/list-view";
import Loader from "@/components/global/loader";
import { deleteCourseAttachment } from "@/actions/courses/delete-attachments";

interface AttachmentFormProps {
  initialData: Course & {
    attachments: Attachment[];
  };
  courseId: string;
}
const AttachmentForm: FC<AttachmentFormProps> = ({ initialData, courseId }) => {
  // ---------------------------------------hooks---------------------------------------
  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const [isEditing, setIsEditing] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof attachmentForm>) => {
    try {
      await createCourseAttachment(courseId, data.url);

      router.refresh();
      toggleEdit();
      toast.success("Course updated");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      await deleteCourseAttachment(id, courseId);
      router.refresh();
      toast.success("Attachment deleted");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="mt-6   bg-slate-100 dark:bg-neutral-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.attachments && (
            <>
              <PlusCircle className="iconsmright" />
              Add Image
            </>
          )}
          {!isEditing && initialData.attachments && (
            <>
              <Pencil className="iconsmright" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (initialData.attachments.length < 0 ? (
          <p className="text-sm mt-1 text-slate-500 italic">
            No attachments found. Please add attachments to the course to make
            it more engaging.
          </p>
        ) : (
          <div className="space-y-2 ">
            <ListView
              items={initialData.attachments}
              render={(attachment) => (
                <div className="flex p-3 w-full  border items-center gap-x-2 text-emerald-700 rounded-md border-emerald-200 bg-emerald-100">
                  <File className="iconsmright flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{attachment.name}</p>

                  {deletingId === attachment.id && (
                    <div className="ml-auto ">
                      <Loader />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => handleDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChanges={(url) => {
              if (url) {
                handleSubmit({ url: url });
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

export default AttachmentForm;
