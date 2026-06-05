import { useState } from "react";
import { excQuery, checkQueryOutput } from "@/services/apiQuery";
import { useQueryContext } from "@/context/queryContext";
import { useParams } from "react-router-dom";

function useExcQuery(onQueryAttempted) {
  const { query } = useQueryContext();
  const { id } = useParams();
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [verdict, setVerdict] = useState(null);

  async function runQuery() {
    setIsRunning(true);
    setError(null);
    setResult(null);
    setVerdict(null);
    try {
      const data = await excQuery(query, id);

      if (
        !data.result ||
        data.result.length === 0 ||
        Object.keys(data.result[0]).length === 0
      ) {
        setResult(null);
        setVerdict("wrong");
        setError("Query returned no valid results.");
        // Call callback after attempt
        if (onQueryAttempted) {
          onQueryAttempted();
        }
        return;
      }

      setResult(data.result);
      const checkData = await checkQueryOutput(
        data.result,
        data.expectedOutput.value,
        id,
        query,
      );
      console.log("checkData:", checkData);
      if (checkData.status === "fail") {
        setVerdict("wrong");
      } else {
        setVerdict(checkData.isCorrect ? "correct" : "wrong");
      }

      // Call callback after attempt/solve
      if (onQueryAttempted) {
        onQueryAttempted();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  }

  return { runQuery, isRunning, result, error, verdict };
}

export default useExcQuery;
