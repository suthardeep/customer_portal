import { cn } from "@/utils/cssHelpers";
import type { ReactNode } from "react";

interface ErrorTextProps {
  className?: string;
  children: ReactNode;
  withBgCard?: boolean;
}

const ErrorText: React.FC<ErrorTextProps> = (props) => {
  const { className, children, withBgCard = false } = props;

  const text = <p className={cn("text-danger-500", className)}>{children}</p>;

  if (withBgCard) {
    return (
      <div className="p-3 rounded-lg bg-danger-50 border border-danger-200">
        {text}
      </div>
    );
  }

  return text;
};

export default ErrorText;
