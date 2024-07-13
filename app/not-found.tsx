"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <main>
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className={"text-[10rem] font-bold text-gray-200 sm:text-[15rem]"}
          >
            404
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
            You have found a secret place
          </h3>
          <p className="mt-3  text-sm text-gray-600">
            Unfortunately, this is only a 404 page. You may have mistyped the
            address, or the page has been moved to another URL.
          </p>

          <Button
            variant={"link"}
            className="  hover mt-4 text-blue-500 hover:bg-blue-400/25"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
