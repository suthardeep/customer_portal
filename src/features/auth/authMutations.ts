import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { queryClient } from "@/queryClient";
import { logout } from "./authService";

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
      router.navigate({ to: "/" });
    },
  });
};
