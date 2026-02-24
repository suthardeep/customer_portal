import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { queryClient } from "@/queryClient";
import { authQueries } from "../authQueries";
import { logout as logoutService } from "../authService";
import type { User } from "@/types/user.types";
import { getErrorStatusCode } from "@/utils/errorStatusCode";

interface UseAuthReturn {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  logout: () => Promise<void>;
  refetch: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery(authQueries.profile());
  // Auto-logout on 401 error

  useEffect(() => {
    if (error && getErrorStatusCode(error) === 401) {
      logout();
    }
  }, [error]);

  const logout = async () => {
    await logoutService();
    queryClient.clear();
    router.navigate({ to: "/" });
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    logout,
    refetch,
  };
};
