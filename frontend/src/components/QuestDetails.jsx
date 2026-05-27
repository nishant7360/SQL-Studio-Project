import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Lightbulb } from "lucide-react";
import SampleTable from "./SampleTable";
import HintItem from "./HintItem";
import { useQueryContext } from "@/context/queryContext";

const difficultyConfig = {
  Easy: "text-green-500 bg-green-950 border-green-800",
  Medium: "text-yellow-500 bg-yellow-950 border-yellow-800",
  Hard: "text-red-500 bg-red-950 border-red-800",
};

const hintsList = ["AI Hint 1", "AI Hint 2", "AI Hint 3"];

function QuestDetails({ question }) {
  const { query, setQuery, hints } = useQueryContext();

  if (!question) return null;

  return (
    <div
      className="flex flex-col h-screen border-r border-zinc-800"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-base font-semibold text-zinc-100 mb-3 leading-snug">
          {question.title}
        </h1>
        <Badge
          variant="outline"
          className={`text-xs font-medium px-2.5 py-0.5 ${difficultyConfig[question.description] ?? ""}`}
        >
          {question.description}
        </Badge>
      </div>

      <Separator className="bg-zinc-800 shrink-0" />

      <ScrollArea className="flex-1 px-6 py-5">
        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
          {question.question}
        </p>

        <Separator className="bg-zinc-800 mb-6" />

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-zinc-500" />
            <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Schema
            </h2>
          </div>
          {question.sampleTables?.map((table) => (
            <SampleTable key={table.tableName} table={table} />
          ))}
        </div>

        <Separator className="bg-zinc-800 mb-6" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-zinc-500" />
            <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Hints
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            {hintsList.map((hint, i) => (
              <HintItem key={hint} label={hint} index={i} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default QuestDetails;
