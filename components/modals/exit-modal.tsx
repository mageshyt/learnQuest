"use client";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { useModal } from "@/hooks/use-modal";
import { AssetConstants } from "@/lib";
import Image from "next/image";

import React from "react";
import { AnimatedButton } from "../ui/animated-button";
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";

const font = Nunito({
  subsets: ["latin"],
});

const ExitModal = () => {
  const { type, onClose, data } = useModal();
  const router = useRouter();

  const isOpenModel = type === "exit-model";

  return (
    <ResponsiveModal open={isOpenModel} onOpenChange={onClose}>
      <ResponsiveModalContent className={font.className}>
        <ResponsiveModalHeader>
          <div className="flex items-center w-full justify-center mb-4">
            <Image
              src={AssetConstants.sad_emoji}
              alt="Sad Emoji"
              height={80}
              width={80}
            />
          </div>

          <ResponsiveModalTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go!
          </ResponsiveModalTitle>

          <ResponsiveModalDescription className="text-center text-base ">
            You&apos;r are about to leave the quiz. Are you sure you want to do
            that?
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <ResponsiveModalFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full ">
            <AnimatedButton
              variant="primary"
              className="w-full"
              size="lg"
              onClick={() => onClose()}
            >
              Keep Learning
            </AnimatedButton>

            <AnimatedButton
              variant={"dangerOutline"}
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/dashboard");
              }}
            >
              End Session
            </AnimatedButton>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ExitModal;
