import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import QuizTable from "./components/quiz";

const QuizPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }


  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto pb-10 container">

      {/* ---------------------- QUIZ TABLE ---------------  */}

      <QuizTable />
    </div>
  );
};

export default QuizPage;
