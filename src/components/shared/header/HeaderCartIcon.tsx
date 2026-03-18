import { Icon } from "@/components/base/icon/Icon";
import { CartCountBadge } from "@/features/cart/components/CartCountBadge";
import { cn } from "@/utils/cssHelpers";
import { Link } from "@tanstack/react-router";

type Props = {
  className?: string;
  isMobile?: boolean;
};

export function HeaderCartIcon({ className, isMobile = false }: Props) {
  return (
    <Link
      to="/cart"
      className={cn(
        "flex flex-col items-center text-n-900 relative",
        isMobile ? "gap-0.5" : "gap-2",
        className,
      )}
      activeProps={{
        className: "flex flex-col items-center gap-0.5 text-p-600",
      }}
      activeOptions={{ exact: true }}
    >
      <Icon
        name="ShoppingCart"
        size="lg"
        className={cn("text-inherit!", iconClassName)}
      />
      <CartCountBadge />
      <p className="text-[13px] text-inherit font-medium">Cart</p>
    </Link>
  );
}

const iconClassName = "text-n-900 group-hover:text-n-950";
