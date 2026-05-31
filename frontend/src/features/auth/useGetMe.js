import { getMe } from "@/services/apiAuth";
import { useState, useEffect } from "react";

export function useGetMe() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMe();
        setUser(data);
        setIsAuthenticated(!!data?.name);
      } catch (error) {
        setIsAuthenticated(false);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getCurrentUser();
  }, []);

  return { isLoading, isAuthenticated, user, error };
}
