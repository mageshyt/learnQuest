"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

import { AlertCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Role } from "@prisma/client";
import { SignOutButton } from "@clerk/nextjs";

import { userInRole } from "@/lib";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import SettingsLoading from "./loading";
import { redirect } from "next/navigation";

const SettingsPage = () => {
  // ======================== hooks ========================
  const { user, isSignedIn, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const { openModal } = useModal();

  // ======================== query ========================

  if (!isLoaded) {
    return <SettingsLoading />;
  }

  if (!user) {
    return redirect("/");
  }
  return (
    <div className="p-6 bg-white dark:bg-neutral-950 h-full">
      <div className="max-w-5xl container">
        {/* Title */}
        <div className="flex flex-col mb-6 md:gap-1 items-center sm:items-start">
          <h1 className="text-lg font-semibold sm:text-xl md:text-2xl sm:font-bold">
            My Settings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Change your settings, and customize the website!
          </p>
        </div>

        {/* Teacher Account Section */}
        {userInRole({
          user_role: (user?.publicMetadata?.role as Role) || "USER",
          roles: ["TEACHER"],
        }) ? (
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold">Teacher Account</h3>
              <p>You are a teacher you can go to teacher dashboard</p>
            </div>
            <div>
              <Button asChild className="rounded-full">
                <Link href="/dashboard/teacher/courses" className="w-full">
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold">Become a Teacher</h3>
              <p>Register as a teacher to create and manage courses.</p>
            </div>
            <div>
              <Button
                onClick={() => openModal("teacher-register-model")}
                className="rounded-full "
              >
                Register
              </Button>
            </div>
          </div>
        )}

        {/* Appearance Section */}
        <div className="py-4">
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
          <div className="flex pt-4 gap-4 items-center flex-wrap">
            {/* Light Theme */}
            <button
              disabled={theme === "light"}
              onClick={() => setTheme("light")}
              className={`items-center rounded-md border-2 p-1 hover:border-accent ${
                theme === "light" ? "border-accent" : "border-muted"
              }`}
            >
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </button>

            {/* Dark Theme */}
            <button
              disabled={theme === "dark"}
              onClick={() => setTheme("dark")}
              className={`items-center rounded-md border-2 p-1 hover:border-accent ${
                theme === "dark" ? "border-accent" : "border-muted"
              }`}
            >
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </button>

            {/* System Theme */}
            <button
              disabled={theme === "system"}
              onClick={() => setTheme("system")}
              className={`items-center rounded-md border-2 p-1 hover:border-accent ${
                theme === "dark" ? "border-accent" : "border-muted"
              }`}
            >
              <div className="space-y-2 rounded-sm w-[140px] h-[130px] flex items-center justify-center text-3xl font-bold border-b ">
                <span>?</span>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                system
              </span>
            </button>
          </div>
        </div>

        <Separator className="mb-10" />

        {/* Danger Zone */}
        <Alert
          variant="destructive"
          className="flex justify-between items-center dark:text-red-600 dark:border-red-600"
        >
          <div className="flex flex-col">
            <div className="flex gap-1 items-start">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Danger Zone</AlertTitle>
            </div>
            <AlertDescription>
              Do you want to sign out from your account?
            </AlertDescription>
          </div>
          <div>
            <Button variant="destructive" className="mx-auto rounded-full">
              <SignOutButton />
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default SettingsPage;
