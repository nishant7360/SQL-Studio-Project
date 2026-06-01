import QuestionCard from "@/components/QuestionCard";

function SolvedQuestions({ solvedQuestions }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-3">
        Solved Questions ({solvedQuestions.length})
      </h2>
      {solvedQuestions.length === 0 ? (
        <p className="text-xs text-zinc-600 py-6 text-center border border-zinc-800 rounded-xl">
          No solved questions yet. Start practicing!
        </p>
      ) : (
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          {solvedQuestions.map((q, i) => (
            <QuestionCard key={q._id} data={q} index={i + 1} status="solved" />
          ))}
        </div>
      )}
    </div>
  );
}

export default SolvedQuestions;
