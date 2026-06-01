import { Trophy } from "lucide-react";

function ProfileProgress({ solvedCount, totalQuestions }) {
  const pct = totalQuestions
    ? Math.round((solvedCount / totalQuestions) * 100)
    : 0;

  return (
    <div
      className="rounded-xl border border-zinc-800 p-6 mb-6"
      style={{ backgroundColor: "#27272a" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-zinc-100">
            Total Solved
          </span>
        </div>
        <span className="text-sm font-medium text-zinc-300">
          {solvedCount} / {totalQuestions}
        </span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-zinc-600 mt-2">{pct}% completed</p>
    </div>
  );
}

export default ProfileProgress;
