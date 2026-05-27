import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableIcon } from "lucide-react";

function SampleTable({ table }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <TableIcon className="w-3.5 h-3.5 text-zinc-500" />
        <span className="text-xs font-mono font-medium text-zinc-300">
          {table.tableName}
        </span>
      </div>
      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              {table.columns.map((col) => (
                <TableHead
                  key={col.columnName}
                  className="py-2 h-auto bg-zinc-800/60"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-zinc-200">
                      {col.columnName}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {col.dataType}
                    </span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((row, i) => (
              <TableRow
                key={i}
                className="border-zinc-800 hover:bg-zinc-800/30"
              >
                {table.columns.map((col) => (
                  <TableCell
                    key={col.columnName}
                    className="py-2 text-xs font-mono text-zinc-300"
                  >
                    {row[col.columnName] ?? "NULL"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SampleTable;
