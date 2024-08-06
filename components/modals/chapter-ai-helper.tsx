"use client";
import React, { useRef, useEffect } from "react";
import { Form, FormControl, FormField } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/hooks/use-modal";
import { useChatStore } from "@/hooks/use-chat-store";

import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { ChatList } from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/components/chat-list";
import { generateHelper } from "@/lib/common/ai-helper";
import { markdownToHtml } from "@/lib";

const MessageFormSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export const ChapterAiHelperModal = () => {
  // ------------------------hooks-------------------------
  const { data, isOpen, onClose, type } = useModal();
  const { getChapterDetails, addMessage } = useChatStore();

  const form = useForm<z.infer<typeof MessageFormSchema>>({
    resolver: zodResolver(MessageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  // ------------------------variables-------------------------

  const isModelOpen = type === "chapter-ai-helper";
  const { chapterId } = data;
  const chapterDetails = getChapterDetails(chapterId!);

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof MessageFormSchema>) => {
    try {
      // setIsGenerating(true);

      addMessage(chapterId!, {
        role: "user",
        parts: [{ text: data.message }],
        content: {
          html: data.message,
        },
      });

      // Simulate AI response
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const reply = await generateHelper({
        transcript: chapterDetails?.transcript!,
        user_msg: data.message,
      });

      // Add AI response to the chat
      addMessage(chapterId!, {
        role: "model",
        parts: [{ text: reply! }],
        content: {
          html: markdownToHtml(reply || ""),
          markdown: reply,
        },
      });

      // setIsGenerating(false);

      form.reset();
    } catch (error) {
      console.log("response error", error);
    }
  };

  return (
    <ResponsiveModal open={isModelOpen} onOpenChange={onClose}>
      <ResponsiveModalContent className=" md:max-w-xl  2xl:max-w-2xl">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>AI Assistance</ResponsiveModalTitle>
          {chapterDetails?.messages.length === 0 && (
            <ResponsiveModalDescription>
              Start the conversation with the AI to get help with the chapter
            </ResponsiveModalDescription>
          )}
        </ResponsiveModalHeader>

        <div className="space-y-2 max-h-[550px] overflow-y-auto  ">
          <ChatList
            messages={chapterDetails?.messages}
            generating={isSubmitting}
          />
        </div>

        <ResponsiveModalFooter className="pt-0">
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        placeholder="Type your message here..."
                        className="flex-1"
                        disabled={isSubmitting}
                      />
                      {field.value && (
                        <Button
                          type="submit"
                          size="icon"
                          variant="outline"
                          className="rounded-full"
                          disabled={!field.value || !isValid || isSubmitting}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                )}
              />
            </form>
          </Form>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
