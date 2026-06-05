import React, { useState } from "react";
import { useGetAllQuestions } from "@/features/Questions/useGetAllQuestions";
import { Spinner } from "@/components/ui/spinner";
import QuestionCard from "@/components/QuestionCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useGetMe } from "@/features/auth/useGetMe";

const sortOptions = ["Default", "Easy first", "Medium first", "Hard first"];
const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };

function QuestionSet() {
  const { isLoading, questions, error } = useGetAllQuestions();
  const [sortBy, setSortBy] = useState("Default");
  const { user } = useGetMe();

  const sortedQuestions = Array.isArray(questions)
    ? [...questions].sort((a, b) => {
        if (sortBy === "Default") return 0;
        if (sortBy === "Easy first")
          return (
            difficultyOrder[a.description] - difficultyOrder[b.description]
          );
        if (sortBy === "Medium first") {
          const order = { Medium: 1, Easy: 2, Hard: 3 };
          return order[a.description] - order[b.description];
        }
        if (sortBy === "Hard first")
          return (
            difficultyOrder[b.description] - difficultyOrder[a.description]
          );
        return 0;
      })
    : [];

  const totalQuestions = questions?.length ?? 0;
  const solvedCount = user?.totalQuestionSolved ?? 0;
  const easyCount =
    questions?.filter((q) => q.description === "Easy").length ?? 0;
  const mediumCount =
    questions?.filter((q) => q.description === "Medium").length ?? 0;
  const hardCount =
    questions?.filter((q) => q.description === "Hard").length ?? 0;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-6" />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-zinc-100 mb-1">
          SQL Questions
        </h1>
        <p className="text-xs text-zinc-500">
          Practice SQL challenges and improve your skills
        </p>
      </div>

      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-zinc-600">
          {totalQuestions} questions
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 text-xs gap-2 border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-400"
            >
              Sort: {sortBy}
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-36 bg-zinc-900 border-zinc-700"
          >
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className={`text-xs cursor-pointer hover:bg-zinc-800 text-zinc-400 ${sortBy === option ? "bg-zinc-800 text-zinc-100" : ""}`}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden pr-1">
        {sortedQuestions.map((data, index) => {
          const attempt = user?.totalQuestionAttempted?.find(
            (a) => a.questionId?.toString() === data._id?.toString(),
          );
          const status = !attempt
            ? "none"
            : attempt.isCorrect
              ? "solved"
              : "attempted";

          return (
            <QuestionCard
              key={data._id}
              data={data}
              index={index + 1}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuestionSet;
