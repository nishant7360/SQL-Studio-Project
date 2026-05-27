import { getAllQuestions } from "../../services/apiQuestion.js";
import { useQuery } from "@tanstack/react-query";

export function useGetAllQuestions() {
  const {
    isLoading,
    data: questions,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
  });
  return { isLoading, questions, error };
}
