import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import * as Sentry from "@sentry/tanstackstart-react";
import { useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";

interface RouteErrorComponentProps extends ErrorComponentProps {
  title?: string;
  subtitle?: string;
}

const RouteErrorComponent: React.FC<RouteErrorComponentProps> = ({
  title = "Something went wrong",
  subtitle = "We ran into an unexpected error. Please try again or head back to the home page.",
  error,
  reset,
}) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-16">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-danger-50">
          <Icon
            name="AlertCircle"
            size="lg"
            className="size-8 text-danger-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-n-900">{title}</h4>
          <p className="text-n-600">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            color="neutral"
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button onClick={() => router.navigate({ to: "/" })}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorComponent;
