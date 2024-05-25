const CoursePage = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  return <div>Course Page: {params.courseId}</div>;
};

export default CoursePage;
