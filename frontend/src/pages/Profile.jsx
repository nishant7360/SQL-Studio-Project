import { useGetMe } from "@/features/auth/useGetMe";
import { useGetAllQuestions } from "@/features/Questions/useGetAllQuestions";
import { Spinner } from "@/components/ui/spinner";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileProgress from "@/components/ProfileProgress";
import DifficultyRings from "@/components/DifficultyRing";
import SolvedQuestions from "@/components/SolvedQuestions";
import { useEffect } from "react";

function Profile() {
  const { user, isLoading: userLoading } = useGetMe();
  const { questions, isLoading: questionsLoading } = useGetAllQuestions();

  useEffect(() => {
    document.title = "Profile | SQL Studio";
  }, []);

  if (userLoading || questionsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-6" />
      </div>
    );

  const totalQuestions = questions?.length ?? 0;
  const solvedCount = user?.totalQuestionSolved ?? 0;

  const solvedIds = new Set(
    user?.totalQuestionAttempted
      ?.filter((a) => a.isCorrect)
      .map((a) => a.questionId?.toString()),
  );

  const solvedQuestions =
    questions?.filter((q) => solvedIds.has(q._id?.toString())) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProfileHeader user={user} />
      <ProfileProgress
        solvedCount={solvedCount}
        totalQuestions={totalQuestions}
      />
      <DifficultyRings
        questions={questions}
        solvedQuestions={solvedQuestions}
      />
      <SolvedQuestions solvedQuestions={solvedQuestions} />
    </div>
  );
}

export default Profile;
