import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GEMINI_API_KEY: z.string(),
    DATABASE_URL: z.string(),
    WEBHOOK_SECRET: z.string(),
    MUX_TOKEN_ID: z.string(),
    MUX_TOKEN_SECRET: z.string(),
    STRIPE_API_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_GEMINI_API_KEY: z.string(),
    NEXT_PUBLIC_APP_URL: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
    MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
});
