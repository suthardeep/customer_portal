import { Button } from "@/components/base/button/Button";
import Divider from "@/components/base/Divider";
import { prettyDate } from "@/utils/formatDateTime";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import type { Policy } from "../types/types";

interface PolicyContentProps {
  policy: Policy;
}

export function PolicyContent({ policy }: PolicyContentProps) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <header className="mb-10">
        {canGoBack && (
          <Button
            variant="ghost"
            color="neutral"
            size="sm"
            onClick={() => router.history.back()}
            startIcon="ChevronLeft"
            className="text-n-800 font-medium mb-1"
          >
            Go Back
          </Button>
        )}
        <h1 className="mb-2">{policy.title}</h1>
        <p className="text-n-800">
          Last updated on {prettyDate(policy.updatedAt)}
        </p>
        <Divider className="mt-6" />
      </header>
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: policy.content }}
      />
    </article>
  );
}
