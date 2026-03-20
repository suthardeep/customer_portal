import { Icon, IconProps } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";

type ShortActionIconButtonProps = Pick<IconProps, "name" | "aria-label"> & {
  onClick?: () => void;
  label?: string | number;
  highlight?: boolean;
  className?: string;
  iconClassName?: string;
};

const ShortActionIconButton: React.FC<ShortActionIconButtonProps> = (props) => {
  const { name, onClick, label, highlight, className, iconClassName } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={cn("flex flex-col gap-0.5 items-center", className)}>
      <div
        className={cn(
          "size-10 fall rounded-full shadow-md border backdrop-blur-lg",
          highlight ? "bg-n-50 border-n-400" : "bg-black/30 border-transparent",
          onClick && "cursor-pointer",
        )}
        onClick={handleClick}
      >
        <Icon
          name={name}
          aria-label={props["aria-label"]}
          className={cn(
            highlight ? "fill-p-600 text-p-600" : "text-n-50",
            iconClassName,
          )}
          size="lg"
        />
      </div>
      {label !== undefined && (
        <p className="text-white font-semibold [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_0_12px_rgba(0,0,0,0.3)]">
          {" "}
          {label}{" "}
        </p>
      )}
    </div>
  );
};

export default ShortActionIconButton;
