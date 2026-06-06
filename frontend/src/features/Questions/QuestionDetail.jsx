import React, { useEffect } from "react";
import { useGetQuestion } from "./useGestQuestion";
import { Spinner } from "@/components/ui/spinner";
import QuestDetails from "@/components/QuestDetails";
import SQLEditor from "@/components/SQLEditor";
import { QueryProvider } from "../../context/queryContext";
import { useGetMe } from "../auth/useGetMe";

function QuestionDetail() {
  const { isLoading, question, error } = useGetQuestion();
  const { user } = useGetMe();

  useEffect(() => {
    if (question?.title) {
      document.title = `${question.title} | SQL Studio`;
    }
  }, [question]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-6" />
      </div>
    );

  return (
    <QueryProvider>
      <div className="grid grid-cols-2">
        <QuestDetails question={question} user={user} />
        <SQLEditor />
      </div>
    </QueryProvider>
  );
}

export default QuestionDetail;
