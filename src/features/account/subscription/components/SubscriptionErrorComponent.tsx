import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { NotLoggedInEmptyState } from "@/features/spotlight/components/NotLoggedInEmptyState";
import { getErrorStatusCode } from "@/utils/errorStatusCode";
import * as Sentry from "@sentry/tanstackstart-react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export function SubscriptionErrorComponent({
  error,
  reset,
}: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const statusCode = getErrorStatusCode(error);
  const isNotLoggedIn = statusCode === 401;

  const handleLoginSuccess = () => {
    reset();
    router.invalidate();
  };

  if (isNotLoggedIn) {
    return <NotLoggedInEmptyState onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex items-center justify-center px-4 mt-10">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-danger-50">
          <Icon
            name="AlertCircle"
            size="lg"
            className="size-8 text-danger-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-n-900 font-medium">Something went wrong</h4>
          <p className="text-n-600">
            {statusCode ||
              "We couldn't load the subscription plans. Please try again or head back home."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" color="neutral" onClick={() => reset()}>
            Try again
          </Button>
          <Button onClick={() => router.navigate({ to: "/" })}>Go home</Button>
        </div>
      </div>
    </div>
  );
}
