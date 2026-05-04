import { useToggle } from "@/hooks/useToggle";
import type { AffiliateLinkResponse } from "../types/types";

export const useShareLink = () => {
  const copied = useToggle();

  const share = async (link: AffiliateLinkResponse, title?: string) => {
    const url = link.airbridgeUrl ?? link.url;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ url, title });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    await navigator.clipboard.writeText(url);
    copied.open();
    setTimeout(() => copied.close(), 1500);
  };

  return { share, copied };
};
