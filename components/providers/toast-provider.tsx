import React from "react";
import { Toaster as SoonerToaster } from "sonner";
import { Toaster as HotToaster } from "react-hot-toast";
const ToastProvider = () => {
  return (
    <>
      <SoonerToaster />
      <HotToaster />
    </>
  );
};

export default ToastProvider;
