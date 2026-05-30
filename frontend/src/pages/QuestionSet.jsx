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

const sortOptions = ["Default", "Easy first", "Medium first", "Hard first"];

const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };

function QuestionSet() {
  const { isLoading, questions, error } = useGetAllQuestions();
  const [sortBy, setSortBy] = useState("Default");

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-6" />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex justify-end px-4 sm:px-6 lg:px-8 mb-4">
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

      {sortedQuestions.map((data, index) => (
        <QuestionCard key={data._id} data={data} index={index + 1} />
      ))}
    </div>
  );
}

export default QuestionSet;
