import { cn } from "@/utils/cssHelpers";

export default function AccountPageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("lg:p-6", className)}>{children}</div>;
}
