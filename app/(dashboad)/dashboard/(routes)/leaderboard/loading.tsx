
import Heading from "@/components/global/heading";
import { Skeleton } from "@/components/ui/skeleton";
const QuizLoadingPage= () => {
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto pb-10 container">

      <div className="mb-6">
        <Heading
          title="Leaderboard"
          isUnderlined={false}
          description="Compete with others and see where you rank. The more you learn, the higher you'll climb."
        />
      </div>

      <Skeleton
        className="h-[500px] w-full bg-gray-200 dark:bg-neutral-800 rounded-lg"
      />


    </div>
  );
};

export default QuizLoadingPage
