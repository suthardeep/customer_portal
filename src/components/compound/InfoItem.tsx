import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/cssHelpers";
import { formatCurrency } from "@/utils/formatCurrency";
import { Icon } from "@/components/base/icon/Icon";
import type { IconName } from "@/components/base/icon/iconRegistry";

interface InfoItemProps {
  label: string;
  value: ReactNode;
  classname?: string;
  trailingLabel?: ReactNode;
  isCurrency?: boolean;
  separated?: boolean;
  direction?: "vertical" | "horizontal";
  labelClassName?: string;
  valueClassName?: string;
  icon?: IconName;
  link?: string;
  linkClassName?: string;
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  const {
    label,
    value,
    classname,
    trailingLabel,
    isCurrency = false,
    direction = "vertical",
    icon,
    labelClassName,
    valueClassName,
    link,
    linkClassName = "",
    separated = false,
  } = props;

  const renderValue = () => {
    const content =
      typeof value === "string" || typeof value === "number" ? (
        <p
          className={cn(
            "text-n-900 font-medium",
            link && "underline",
            valueClassName,
          )}
        >
          {isCurrency ? formatCurrency(Number(value)) : value}{" "}
        </p>
      ) : (
        value
      );

    if (link) {
      return (
        <Link to={link} className={cn("block underline", linkClassName)}>
          {content}
        </Link>
      );
    }

    return content;
  };

  return (
    <div
      className={cn(
        "flex gap-y-1 gap-x-3",
        direction === "vertical"
          ? "flex-col items-start"
          : "flex-row items-center",
        separated && "justify-between",
        classname,
      )}
    >
      <div className="flex items-center gap-1">
        {icon && <Icon name={icon} size="lg" className="text-n-500 mt-0.5" />}
        {label && (
          <p className={cn("text-n-800 mr-auto", labelClassName)}> {label} </p>
        )}
        {trailingLabel && trailingLabel}
      </div>
      {renderValue()}
    </div>
  );
};

export default InfoItem;
