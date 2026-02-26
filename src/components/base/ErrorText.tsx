import { cn } from "@/utils/cssHelpers";
import type { ReactNode } from "react";

interface ErrorTextProps {
  className?: string;
  children: ReactNode;
}

const ErrorText: React.FC<ErrorTextProps> = (props) => {
  const { className, children } = props;

  return <p className={cn("text-danger-500", className)}>{children}</p>;
};

export default ErrorText;
