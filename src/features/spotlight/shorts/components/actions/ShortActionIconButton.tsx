import { Icon, IconProps } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";

type ShortActionIconButtonProps = Pick<IconProps, "name" | "aria-label"> & {
  onClick?: () => void;
  label?: string | number;
  highlight?: boolean;
  className?: string;
  iconClassName?: string;
  enableLightMode?: boolean;
  iconSize?: IconProps["size"];
};

const ShortActionIconButton: React.FC<ShortActionIconButtonProps> = (props) => {
  const {
    name,
    onClick,
    label,
    highlight,
    className,
    iconClassName,
    enableLightMode = false,
    iconSize = "lg",
  } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={cn("flex flex-col gap-0.5 items-center", className)}>
      <div
        className={cn(
          "size-10 fall rounded-full shadow-md lg:shadow-none border backdrop-blur-lg",
          highlight
            ? `${enableLightMode ? "bg-p-50 border-transparent" : `bg-n-50 border-n-400`}`
            : `bg-black/30 ${enableLightMode ? `lg:bg-n-400 border-transparent` : "border-n-900/50"} `,
          onClick && "cursor-pointer",
        )}
        onClick={handleClick}
      >
        <Icon
          name={name}
          aria-label={props["aria-label"]}
          className={cn(
            highlight
              ? "fill-p-600 text-p-600"
              : `text-n-50 ${enableLightMode && `lg:text-n-900`}`,
            iconClassName,
          )}
          size={iconSize}
        />
      </div>
      {label !== undefined && (
        <p className="text-white lg:text-n-900 font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_0_12px_rgba(0,0,0,0.3)] lg:text-shadow-none">
          {" "}
          {label}{" "}
        </p>
      )}
    </div>
  );
};

export default ShortActionIconButton;
