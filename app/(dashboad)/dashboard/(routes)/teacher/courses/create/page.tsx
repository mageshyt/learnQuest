import CourseForm from "../components/course-form";

const CreateCoursePage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto w-full flex flex-col md:items-center md:justify-center h-full">
      <div>
        <h1 className="text-2xl">Name Your Course</h1>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          What would you like to call your course? Don&apos;t worry, you can
          change
        </p>

        <CourseForm />
      </div>
    </div>
  );
};

export default CreateCoursePage;
