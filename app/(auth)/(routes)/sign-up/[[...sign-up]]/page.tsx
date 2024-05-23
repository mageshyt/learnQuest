import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      {/* image */}
      <div className="relative block h-16 lg:hidden pattern-bg   "></div>
      {/* sign-in */}
      <div className="h-full lg:flex flex-col items-center justify-center px-4 col-span-2">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-muted-[#2E2A47] dark:text-white">
            Welcome to Learn Quest 📔
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your learning journey
          </p>
        </div>
        {/* card */}
        <div className="flex items-center justify-center mt-8 col-start-2">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      <div className="h-full pattern-bg hidden lg:block "></div>
    </div>
  );
}
