import { Badge } from "@/components/base/badge/Badge";
import { cartQueries } from "@/features/cart/cartQueries";
import { useQuery } from "@tanstack/react-query";

export function CartCountBadge() {
  const { data } = useQuery(cartQueries.detail());
  const count = data?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return <Badge count={count} />;
}
