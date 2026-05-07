import { useQuery } from "@tanstack/react-query";
import { authQueries } from "../authQueries";
import type { User } from "@/types/user.types";

interface UseAuthReturn {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery(authQueries.profile());

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    refetch,
  };
};
