"use client";

import * as React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootCustomModalProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CustomModalProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const CustomModal = ({ children, ...props }: RootCustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModal = isDesktop ? Dialog : Drawer;

  return <CustomModal {...props}>{children}</CustomModal>;
};

const CustomModalTrigger = ({ className, children, ...props }: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CustomModalTrigger className={className} {...props}>
      {children}
    </CustomModalTrigger>
  );
};

const CustomModalClose = ({ className, children, ...props }: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <CustomModalClose className={className} {...props}>
      {children}
    </CustomModalClose>
  );
};

const CustomModalContent = ({ className, children, ...props }: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <CustomModalContent className={className} {...props}>
      {children}
    </CustomModalContent>
  );
};

const CustomModalDescription = ({
  className,
  children,
  ...props
}: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <CustomModalDescription className={className} {...props}>
      {children}
    </CustomModalDescription>
  );
};

const CustomModalHeader = ({ className, children, ...props }: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CustomModalHeader className={className} {...props}>
      {children}
    </CustomModalHeader>
  );
};

const CustomModalTitle = ({ className, children, ...props }: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CustomModalTitle className={className} {...props}>
      {children}
    </CustomModalTitle>
  );
};

const CustomModalBody = ({ className, children, ...props }: CustomModalProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const CustomModalFooter = ({ className, children, ...props }: CustomModalProps) => {
  const isDesktop = useMediaQuery(desktop);
  const CustomModalFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CustomModalFooter className={className} {...props}>
      {children}
    </CustomModalFooter>
  );
};

export {
  CustomModal,
  CustomModalTrigger,
  CustomModalClose,
  CustomModalContent,
  CustomModalDescription,
  CustomModalHeader,
  CustomModalTitle,
  CustomModalBody,
  CustomModalFooter,
};
