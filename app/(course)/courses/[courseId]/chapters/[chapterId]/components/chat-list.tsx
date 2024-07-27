import { cn } from "@/lib/utils";
import React, { useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChatMessage } from "@/hooks/use-chat-store";
import UserAvatar from "@/components/global/user-avatar";
import Loader from "@/components/global/loader";
import { HtmlToText } from "@/lib";
import { Preview } from "@/components/global/preview";

interface ChatListProps {
  messages?: ChatMessage[];
  generating?: boolean;
}

export function ChatList({ messages, generating }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      console.log("scrolling to bottom");
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages?.length]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: index === messages.length - 1 ? 0.5 : 0.1,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex gap-3 p-2  whitespace-pre-wrap items-start",
                message.role !== "user" ? " flex-row-reverse" : ""
              )}
            >
              <UserAvatar
                fallback={message.role === "user" ? "You" : "AI"}
                imageUrl=""
                fallbackStyle={
                  message.role === "model" ? "bg-black text-white" : ""
                }
                alt={message.role === "user" ? "You" : "AI"}
              />

              <div className=" bg-accent p-3 rounded-md w-fit">
                {message.role === "model" ? (
                  <Preview value={message.content?.html || ""} />
                ) : (
                  message.content?.html
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {
          // Show loader if generating message
          generating && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )
        }
      </div>
    </div>
  );
}
