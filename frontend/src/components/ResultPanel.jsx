import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle } from "lucide-react";
import { Spinner } from "./ui/spinner";

export function ResultPanel({ result, error, isRunning }) {
  if (isRunning)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="size-4" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center gap-2 px-4 py-3">
        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
        <p className="text-xs text-red-400 font-mono">{error}</p>
      </div>
    );

  if (!result)
    return (
      <p className="text-xs text-zinc-600 px-4 py-3">
        Run your query to see results.
      </p>
    );

  const columns = Object.keys(result[0] || {});

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 shrink-0">
        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
        <span className="text-xs text-green-500 font-medium">
          {result.length} row{result.length !== 1 ? "s" : ""} returned
        </span>
      </div>
      <ScrollArea className="flex-1">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col}
                  className="py-2 h-auto bg-zinc-800/60 text-xs font-medium text-zinc-200"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.map((row, i) => (
              <TableRow
                key={i}
                className="border-zinc-800 hover:bg-zinc-800/30"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    className="py-2 text-xs font-mono text-zinc-300"
                  >
                    {row[col] ?? "NULL"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
