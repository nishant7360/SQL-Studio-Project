import { useQuery } from "@tanstack/react-query";
import { getQuestionById } from "../../services/apiQuestion.js";
import { useParams } from "react-router-dom";

export function useGetQuestion() {
  const { id } = useParams();

  const {
    isLoading,
    data: question,
    error,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
  });

  return { isLoading, question, error };
}
