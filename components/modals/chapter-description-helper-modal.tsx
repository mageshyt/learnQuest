"use client";
import React, { FC } from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
  ResponsiveModalClose,
} from "@/components/ui/responsive-modal";
import { getCourseChapterDescription } from "@/lib/ai-helper";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Sparkle } from "lucide-react";
import { markdownToHtml } from "@/lib";
import { useModal } from "@/hooks/use-modal";
import { Preview } from "../global/preview";
import { LoadingButton } from "../ui/loading-button";

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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [generatedDescription, setGeneratedDescription] =
    React.useState<string>("");

  // ------------------------- handlers -------------------------

  const generate = async () => {
    // clear the generated description
    setLoading(true);

    setGeneratedDescription("");
    const res = await getCourseChapterDescription(details);
    if (!res) return;
    // convert the md to html
    const parsed_result = markdownToHtml(res);
    setGeneratedDescription(parsed_result);

    setLoading(false);
  };

  const onSave = () => {
    updateDescription(generatedDescription);
  };

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button variant={"outline"} type="button">
          <Sparkle className="mr-2 h-4 w-4" />
          Generate
        </Button>
      </ResponsiveModalTrigger>

      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Chapter Description Helper
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>

        <div className="gap-4 max-h-[500px] overflow-y-auto">
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
              that helps Ai generate a more compelling description for the chapter."
          />

          {/* button */}
        </div>

        <ResponsiveModalFooter className="space-y-4 gap-y-4">
          <LoadingButton
            loading={loading}
            disabled={loading}
            onClick={generate}
            type="button"
          >
            <Sparkle className="mr-2 h-4 w-4" />
            Generate
          </LoadingButton>

          {generatedDescription && (
            <ResponsiveModalClose asChild>
              <Button onClick={onSave} type="button" variant="outline">
                Save and Close
              </Button>
            </ResponsiveModalClose>
          )}
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ChapterDescriptionHelperModal;
