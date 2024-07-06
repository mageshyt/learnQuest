import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GEMINI_API_KEY: z.string(),
    DATABASE_URL: z.string(),
    WEBHOOK_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_GEMINI_API_KEY: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  },
});
