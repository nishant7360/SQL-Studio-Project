import { CheckCircle2, Zap, Flame } from "lucide-react";

const difficulties = [
  {
    label: "Easy",
    color: "text-green-500",
    stroke: "#22c55e",
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  },
  {
    label: "Medium",
    color: "text-yellow-500",
    stroke: "#eab308",
    icon: <Zap className="w-4 h-4 text-yellow-500" />,
  },
  {
    label: "Hard",
    color: "text-red-500",
    stroke: "#ef4444",
    icon: <Flame className="w-4 h-4 text-red-500" />,
  },
];

function Ring({ pct, stroke, solved, total, color, label, icon }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div
      className="rounded-xl border border-zinc-800 p-4 flex flex-col items-center gap-2"
      style={{ backgroundColor: "#27272a" }}
    >
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
          <circle
            cx="35"
            cy="35"
            r={r}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="6"
          />
          <circle
            cx="35"
            cy="35"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-base font-bold ${color}`}>{solved}</span>
          <span className="text-[10px] text-zinc-600">/{total}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className={`text-xs font-medium ${color}`}>{label}</span>
      </div>
    </div>
  );
}

function DifficultyRings({ questions, solvedQuestions }) {
  const stats = difficulties.map((d) => ({
    ...d,
    total: questions?.filter((q) => q.description === d.label).length ?? 0,
    solved:
      solvedQuestions?.filter((q) => q.description === d.label).length ?? 0,
  }));

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {stats.map((d) => (
        <Ring
          key={d.label}
          pct={d.total ? (d.solved / d.total) * 100 : 0}
          {...d}
        />
      ))}
    </div>
  );
}

export default DifficultyRings;
