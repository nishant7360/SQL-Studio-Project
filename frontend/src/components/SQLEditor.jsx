import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useQueryContext } from "@/context/queryContext";
import useExcQuery from ".././features/Query/useQueryExe.js";
import { Spinner } from "@/components/ui/spinner";
import { ResultPanel } from "./ResultPanel.jsx";
import { RotateCcw } from "lucide-react";

const DEFAULT_QUERY = `-- Write your SQL query here\nSELECT `;

function SQLEditor() {
  const editorRef = useRef(null);
  const { setQuery } = useQueryContext();
  const { runQuery, isRunning, result, error, verdict } = useExcQuery();

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  function handleReset() {
    editorRef.current?.setValue(DEFAULT_QUERY);
    setQuery(DEFAULT_QUERY);
  }

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 font-mono">sql</span>
          <button
            onClick={handleReset}
            title="Reset query"
            className="group relative p-1 rounded hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
            <span className="absolute left-1/2 -translate-x-1/2 top-6 text-[10px] text-zinc-300 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Reset query
            </span>
          </button>
        </div>

        <button
          onClick={runQuery}
          disabled={isRunning}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
        >
          {isRunning ? <Spinner className="size-3" /> : "▶ Run"}
        </button>
      </div>

      <div className="flex-1 min-h-0" style={{ height: "60%" }}>
        <Editor
          height="100%"
          defaultLanguage="sql"
          defaultValue={DEFAULT_QUERY}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={(val) => setQuery(val ?? "")}
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, Fira Code, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
            padding: { top: 16 },
            suggest: { showKeywords: true },
          }}
        />
      </div>

      <div
        className="shrink-0 border-t border-zinc-800 flex flex-col"
        style={{ height: "45%" }}
      >
        <div className="px-4 py-2 border-b border-zinc-800 shrink-0">
          <span className="text-xs font-medium text-zinc-400">Output</span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <ResultPanel
            result={result}
            error={error}
            isRunning={isRunning}
            verdict={verdict}
          />
        </div>
      </div>
    </div>
  );
}

export default SQLEditor;
