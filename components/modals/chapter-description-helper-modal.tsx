"use client";
import React, { FC } from "react";
import {
  CustomModal,
  CustomModalBody,
  CustomModalContent,
  CustomModalFooter,
  CustomModalHeader,
  CustomModalTitle,
  CustomModalTrigger,
  CustomModalClose,
} from "@/components/global/custom-modal";
import { getCourseChapterDescription } from "@/lib/ai-heper";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Sparkle } from "lucide-react";
import { markdownToHtml } from "@/lib";
import { useModal } from "@/hooks/use-modal";
import { Preview } from "../global/preview";

interface ChapterDescriptionHelperModalProps {
  chapterTitle: string;
  updateDescription: (description: string) => void;
}

const ChapterDescriptionHelperModal: FC<ChapterDescriptionHelperModalProps> = ({
  chapterTitle,
  updateDescription,
}) => {
  // ------------------------- state -------------------------
  const [details, setDetails] = React.useState<string>("");

  const [generatedDescription, setGeneratedDescription] =
    React.useState<string>("");

  // ------------------------- handlers -------------------------

  const generate = async () => {
    // clear the generated description
    setGeneratedDescription("");
    const res = await getCourseChapterDescription(details);
    if (!res) return;
    // convert the md to html
    const parsed_result = markdownToHtml(res);
    setGeneratedDescription(parsed_result);
  };

  const onSave = () => {
    updateDescription(generatedDescription);
  };

  return (
    <CustomModal>
      <CustomModalTrigger asChild>
        <Button type="button">
          <Sparkle className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </CustomModalTrigger>

      <CustomModalContent>
        <CustomModalHeader>
          <CustomModalTitle>Chapter Description Helper</CustomModalTitle>
        </CustomModalHeader>

        <CustomModalBody className="gap-4">
          {/* preview */}

          {generatedDescription && (
            <div>
              <h3 className="text-sm font-semibold">Preview</h3>

              <Preview value={generatedDescription} />
            </div>
          )}

          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="provide a short description of about the chapter content
              that helps Ai generate a more compelling description for the chapter.
              "
          />

          {/* button */}
        </CustomModalBody>

        <CustomModalFooter>
          <Button onClick={generate} type="button">
            <Sparkle className="mr-2 h-4 w-4" />
            Generate
          </Button>

          {generatedDescription && (
            <CustomModalClose asChild>
              <Button onClick={onSave} type="button" variant="outline">
                Save and Close
              </Button>
            </CustomModalClose>
          )}
        </CustomModalFooter>
      </CustomModalContent>
    </CustomModal>
  );
};

export default ChapterDescriptionHelperModal;
