import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle2, CircleDot, Circle } from "lucide-react";

const difficultyConfig = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};
const statusConfig = {
  solved: <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />,
  attempted: <CircleDot className="w-4 h-4 text-yellow-500 shrink-0" />,
  none: <Circle className="w-4 h-4 text-zinc-700 shrink-0" />,
};

function QuestionCard({ data, index, status = "none" }) {
  return (
    <div className="w-full hover:bg-zinc-800/60 transition-colors cursor-pointer border-b border-zinc-800 last:border-b-0">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-zinc-500 text-sm w-6 shrink-0">{index}.</span>
          {statusConfig[status]}
          <Link
            to={`/questionset/${data._id}`}
            className="text-zinc-100 text-sm font-medium truncate"
          >
            {data.title}
          </Link>
        </div>

        <span
          className={`text-sm font-medium shrink-0 ml-4 ${difficultyConfig[data.description] ?? "text-zinc-400"}`}
        >
          {data.description}
        </span>
      </div>
    </div>
  );
}

export default QuestionCard;
