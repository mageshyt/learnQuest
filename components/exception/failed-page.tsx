"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
interface FailurePageProps {
  message?: string;
}
const FailurePage = ({
  message = "Something went wrong, please try again later",
}: FailurePageProps) => {
  return (
    <div className="h-full w-full p-4 flex items-center gap-10 justify-center flex-col-reverse  md:flex-row">
      {/* left */}
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl my-2 font-bold text-primary">Oops!</h1>
        <p className="text-xl text-secondary">{message}</p>
        <Button
          variant="default"
          className="mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
      {/* right */}
      <div
        className="relative 
      w-96 h-96
      "
      >
        <Image
          src="/question.svg"
          alt="something went wrong"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default FailurePage;
