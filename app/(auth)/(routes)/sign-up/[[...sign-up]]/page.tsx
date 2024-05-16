import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      {/* image */}
      <div className="relative block h-16 lg:hidden  ">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
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
            <SignUp path="/sign-up"  />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      {/* image */}
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center ">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
