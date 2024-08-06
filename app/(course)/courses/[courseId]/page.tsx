import { getCourseById } from "@/actions/general/getCourseById";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { VideoPlayer } from "./components/demo-player";
import Preview from "@/components/global/preview-md";
import Link from "next/link";
import Navbar from "@/app/(dashboad)/components/navbar";
import Sidebar from "@/app/(dashboad)/components/sidebar";
import tw from "tailwind-styled-components";

const CourseIdPage = async ({
  params: { courseId },
}: {
  params: {
    courseId: string;
  };
}) => {
  const course = await getCourseById(courseId);
  if (!course || course.chapters.length === 0) {
    return redirect("/dashboard/search/");
  }

  // show the course intro page contain cou

  return (
    <Wrapper>
      {/* navbar */}
      <div className="fixed inset-y-0 z-50 h-[80px] w-full dark:bg-neutral-950 bg-white lg:pl-64">
        <Navbar />
      </div>
      {/* sidebar */}
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      {/* content */}

      <main className="h-full pt-[80px] lg:pl-64 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-7 p-4 md:p-8 lg:p-4">
          {/* video - description */}

          <div className="md:col-span-5 ">
            <VideoPlayer
              isLocked={!course.chapters[0]?.isFree}
              playbackId={course.chapters[0]?.muxData?.playbackId}
            />

            {/* description */}

            <Preview value={course.description || ""} />
          </div>

          {/* start journey */}

          <div className="md:col-span-2">
            <Card className=" border rounded-md p-4 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-gray-900">
              <CardHeader className="p-2">
                <CardTitle className="text-white">
                  Ready to start your journey with {course.title}?
                </CardTitle>
                <CardDescription className="">
                  Track your progress,watch with subtitles and challenge
                  yourself
                </CardDescription>
              </CardHeader>
              <Link
                href={`/courses/${courseId}/chapters/${course.chapters[0].id}`}
              >
                <Button className="bg-white text-black w-full hover:bg-white/80 py-2">
                  <PlayCircle className="size-4 mr-2" />
                  Start Journey
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default CourseIdPage;

const Wrapper = tw.div` min-h-screen bg-[#f9fafb] dark:bg-neutral-950`;

const SidebarWrapper = tw.div`fixed inset-y-0 z-50 hidden h-full bg-white dark:bg-neutral-950 w-64 flex-col lg:flex `;
