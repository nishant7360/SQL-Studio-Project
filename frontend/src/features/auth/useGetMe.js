import { getMe } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useGetMe() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    isAuthenticated: !!data?.name,
    user: data ?? null,
    refetch,
  };
}
