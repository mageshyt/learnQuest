"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChanges: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChanges, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(file) => {
        onChanges(file[0].url);
      }}
      onUploadError={(error) => {
        toast.error(`${error.message}`);
      }}
    />
  );
};
