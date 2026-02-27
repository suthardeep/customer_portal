import { Badge } from "@/components/base/badge/Badge";
import { cartQueries } from "@/features/cart/cartQueries";
import { useQuery } from "@tanstack/react-query";

export function CartCountBadge() {
  const { data } = useQuery(cartQueries.detail());
  const count = data?.totalItems ?? 0;

  return <Badge count={count} />;
}
