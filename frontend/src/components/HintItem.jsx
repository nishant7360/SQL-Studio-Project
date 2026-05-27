import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useQueryContext } from "@/context/queryContext";
import { Spinner } from "@/components/ui/spinner";

function HintItem({ label, index }) {
  const [open, setOpen] = useState(false);
  const { hints, generateHint, loadingHintIndex } = useQueryContext();
  const isLoading = loadingHintIndex === index;
  const hint = hints[index];

  function handleOpen(isOpen) {
    setOpen(isOpen);
    if (isOpen && !hint) generateHint(index);
  }

  return (
    <Collapsible open={open} onOpenChange={handleOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-md text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors group">
        <span>{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 py-2 text-xs text-zinc-400 leading-relaxed">
        {isLoading ? (
          <div className="flex items-center gap-2 text-zinc-600">
            <Spinner className="size-3" />
            <span>Generating hint...</span>
          </div>
        ) : hint ? (
          hint
        ) : (
          <span className="text-zinc-600">Click to reveal hint.</span>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default HintItem;
