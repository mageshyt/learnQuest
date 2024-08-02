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

import React, { useState } from "react";
import { AnimatedButton } from "../ui/animated-button";
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";
import { registerTeacher } from "@/actions/user/regiser-teacher";

const font = Nunito({
  subsets: ["latin"],
});

const STEPS = {
  register: 0,
  success: 1,
  error: 2,
};

const TeacherRegisterModal = () => {
  // ======================== hooks ========================
  const { type, onClose } = useModal();

  const router = useRouter();

  // ======================== state ========================
  const [step, setStep] = useState(STEPS.register);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "You have been successfully registered as a teacher!"
  );

  // ======================== variables ========================

  const isOpenModel = type === "teacher-register-model";

  const handleRegister = async () => {
    try {
      const res = await registerTeacher();

      if ("error" in res) {
        console.log(res.error);
        setMessage(
          res.error || "An error occurred while updating the user role"
        );
        setStep(STEPS.error);
        return;
      }

      // proceed to success step
      setSuccessMessage(
        res.message || "You have been successfully registered as a teacher!"
      );
      setStep(STEPS.success);
    } catch (err) {
      console.log(err);
      setMessage("An error occurred while updating the user role");
      setStep(STEPS.error);
    }
  };

  let content = null;

  if (step === STEPS.register) {
    content = (
      <>
        <ResponsiveModalHeader>
          <div className="flex items-center w-full justify-center mb-4 pt-6">
            <Image
              src={AssetConstants.teacher}
              alt="Teacher"
              height={120}
              width={120}
            />
          </div>

          <ResponsiveModalTitle className="text-center font-bold text-2xl">
            Register as a Teacher
          </ResponsiveModalTitle>

          <ResponsiveModalDescription className="text-center text-base">
            Join our platform to create and manage courses, interact with
            students, and more.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <AnimatedButton
              variant="primary"
              className="w-full"
              size="lg"
              onClick={handleRegister}
            >
              Register Now
            </AnimatedButton>

            <AnimatedButton
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/dashboard");
              }}
            >
              Cancel
            </AnimatedButton>
          </div>
        </ResponsiveModalFooter>
      </>
    );
  }

  if (step === STEPS.success) {
    content = (
      <>
        <ResponsiveModalHeader>
          <div className="flex items-center w-full justify-center mb-4 pt-6">
            <Image
              src={AssetConstants.verified}
              alt="Success"
              height={120}
              width={120}
            />
          </div>

          <ResponsiveModalTitle className="text-center font-bold text-2xl">
            Registration Successful!
          </ResponsiveModalTitle>

          <ResponsiveModalDescription className="text-center text-base">
            {successMessage}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <AnimatedButton
              variant="primary"
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/dashboard/teacher/courses");
              }}
            >
              Go to Dashboard
            </AnimatedButton>

            <AnimatedButton
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={onClose}
            >
              Close
            </AnimatedButton>
          </div>
        </ResponsiveModalFooter>
      </>
    );
  }

  if (step === STEPS.error) {
    content = (
      <>
        <ResponsiveModalHeader>
          <div className="flex items-center w-full justify-center mb-4 pt-6">
            <Image
              src={AssetConstants.sad_emoji}
              alt="Error"
              height={120}
              width={120}
            />
          </div>

          <ResponsiveModalTitle className="text-center font-bold text-2xl">
            An Error Occurred
          </ResponsiveModalTitle>

          <ResponsiveModalDescription className="text-center text-base">
            {message}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <AnimatedButton
              variant="danger"
              className="w-full"
              size="lg"
              onClick={() => {
                setStep(STEPS.register);
                setMessage("");
              }}
            >
              Try Again
            </AnimatedButton>

            <AnimatedButton
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/dashboard");
              }}
            >
              Cancel
            </AnimatedButton>
          </div>
        </ResponsiveModalFooter>
      </>
    );
  }

  return (
    <ResponsiveModal open={isOpenModel} onOpenChange={onClose}>
      <ResponsiveModalContent className={font.className}>
        {content}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default TeacherRegisterModal;
