import { cn } from "@/utils/cssHelpers";

interface DividerProps {
  className?: string;
  vertical?: boolean;
}

const Divider: React.FC<DividerProps> = (props) => {
  const { className, vertical } = props;
  return (
    <div
      className={cn(
        "bg-n-400 h-px w-full",
        vertical ? "h-full w-px" : "h-px w-full",
        className,
      )}
    />
  );
};

export default Divider;
