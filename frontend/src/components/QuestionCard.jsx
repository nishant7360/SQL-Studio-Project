import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const difficultyConfig = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

function QuestionCard({ data, index }) {
  return (
    <div className="w-full bg-[#22222368] hover:bg-zinc-800/60 transition-colors cursor-pointer border-b border-zinc-800 m-2.5 rounded-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-zinc-500 text-sm w-6 shrink-0">{index}.</span>
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
