import React, { createContext, useContext, useState } from "react";
import { getHints } from "../services/apiHints.js";
import { useParams } from "react-router-dom";

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [query, setQuery] = useState("-- Write your SQL query here\nSELECT ");
  const [hints, setHints] = useState([]);
  const [loadingHintIndex, setLoadingHintIndex] = useState(null);
  const { id } = useParams();

  async function generateHint(hintIndex) {
    if (hints[hintIndex]) return; // already generated, don't refetch
    setLoadingHintIndex(hintIndex);
    try {
      const hint = await getHints(id, query, hints);
      setHints((prev) => {
        const updated = [...prev];
        updated[hintIndex] = hint;
        return updated;
      });
    } catch (err) {
      console.error("Hint error:", err.message);
    } finally {
      setLoadingHintIndex(null);
    }
  }

  function resetAll() {
    setQuery("-- Write your SQL query here\nSELECT ");
    setHints([]);
  }

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        hints,
        generateHint,
        loadingHintIndex,
        resetAll,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export function useQueryContext() {
  return useContext(QueryContext);
}
