import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ChatMessage {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
  content: {
    markdown?: string; // Optional markdown version of the message, if applicable
    html?: string; // Optional HTML version of the message, if applicable
  };
}

interface ChapterHistory {
  transcript: string;
  createdAt: Date;
  messages: ChatMessage[];
  chapterId: string;
}

interface ChatStore {
  history: ChapterHistory[];
  addMessage: (chapterId: string, message: ChatMessage) => void;
  getChapterHistory: (chapterId: string) => ChatMessage[];
  createChapter: (chapterId: string, transcript?: string) => void;
  getChapterDetails: (chapterId: string) => ChapterHistory | undefined;
  updateChapterTranscript: (chapterId: string, transcript: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      history: [],

      addMessage: (chapterId, message) =>
        set((state) => {
          // check if the chapter already exists in the history
          const existingChapter = state.history.find(
            (ch) => ch.chapterId === chapterId
          );

          // if it exists, add the message to the existing chapter

          if (existingChapter) {
            existingChapter.messages.push(message);
          } else {
            state.history.push({
              chapterId,
              messages: [{
                role: message.role,
                parts: message.parts,
                content: {
                  markdown: message.content.markdown,
                  html: message.content.html,
                },
              }],
              createdAt: new Date(),
              transcript: "",
            });
          }

          return { history: [...state.history] };
        }),

      getChapterHistory: (chapterId) => {
        const chapter = get().history.find((ch) => ch.chapterId === chapterId);
        return chapter ? chapter.messages : [];
      },

      createChapter: (chapterId, transcript) =>
        set((state) => {
          state.history.push({
            chapterId,
            messages: [],
            createdAt: new Date(),
            transcript: transcript || "",
          });

          return { history: [...state.history] };
        }),

      getChapterDetails: (chapterId) => {
        const chapter = get().history.find((ch) => ch.chapterId === chapterId);
        return chapter;
      },
      updateChapterTranscript: (chapterId, transcript) =>
        set((state) => {
          const chapter = state.history.find(
            (ch) => ch.chapterId === chapterId
          );
          if (chapter) {
            chapter.transcript = transcript;
            chapter.createdAt = new Date();
          }
          return { history: [...state.history] };
        }),
    }),
    {
      name: "chat-history-storage", // Unique name for storage in localStorage
      getStorage: () => localStorage, // Define the storage type (localStorage)
    }
  )
);
