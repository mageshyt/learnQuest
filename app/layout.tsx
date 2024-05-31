import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-providers";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import ToastProvider from "@/components/providers/toast-provider";
import QueryProvider from "@/components/providers/query-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Quest",
  description:
    "Join the Learn Quest community and unlock a world of educational resources, courses, and expert insights. Take control of your learning journey and achieve your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "h-screen")}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            // storageKey="learn-quest-theme"
          >
            <ClerkProvider>
              <ToastProvider />
              {children}
            </ClerkProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
