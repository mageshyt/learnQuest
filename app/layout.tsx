import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-providers";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const font = Nunito({ subsets: ["vietnamese"] });

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
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="learn-quest-theme"
        >
          <ClerkProvider>
            <Toaster />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
