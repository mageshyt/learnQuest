import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CourseForm from "./course-form";
const CreateCourse = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Course
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new course</SheetTitle>
          <SheetDescription>
            Fill in the form below to create a new course. You can always edit
          </SheetDescription>
        </SheetHeader>
        <div>
          <CourseForm />
        </div>
        <SheetFooter className="mt-4">
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCourse;
