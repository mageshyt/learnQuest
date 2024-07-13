import Image from "next/image";
import React from "react";

interface NoResultFoundProps {
  message?: string;
}
const NoResultFound = ({
  message = "No result found for your search",
}: NoResultFoundProps) => {
  return (
    <div className="mx-auto flex  h-full w-full items-center justify-start px-4 md:px-8">
      <div className="mx-auto max-w-2xl flex items-center flex-col gap-4 text-center">
        <Image
          src="/no-result.svg"
          alt="no result found"
          width={200}
          height={200}
        />

        <h1 className=" text-sm text-muted-foreground mt-10">{message}</h1>
      </div>
    </div>
  );
};

export default NoResultFound;
