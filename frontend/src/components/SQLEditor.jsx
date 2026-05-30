import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useQueryContext } from "@/context/queryContext";
import useExcQuery from ".././features/Query/useQueryExe.js";
import { Spinner } from "@/components/ui/spinner";
import { ResultPanel } from "./ResultPanel.jsx";

function SQLEditor() {
  const editorRef = useRef(null);
  const { setQuery } = useQueryContext();
  const { runQuery, isRunning, result, error } = useExcQuery();

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 shrink-0">
        <span className="text-xs text-zinc-500 font-mono">sql</span>
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
          defaultValue={`-- Write your SQL query here\nSELECT `}
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
          <ResultPanel result={result} error={error} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}

export default SQLEditor;
