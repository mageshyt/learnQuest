import { getCourseById } from "@/actions/general/getCourseById";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params: { courseId },
}: {
  params: {
    courseId: string;
  };
}) => {
  const course = await getCourseById(courseId);
  if (!course) {
    return redirect("/dashboard/search/");
  }

  return redirect(`/courses/${courseId}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
