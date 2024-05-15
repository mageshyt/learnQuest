import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-providers";

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
          defaultTheme="system"
          enableSystem={true}
          storageKey="learn-quest-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
