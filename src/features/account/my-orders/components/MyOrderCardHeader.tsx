import { cn } from "@/utils/cssHelpers";
import { OrderItem } from "../types/types";
import {
  getOrderStatusColor,
  getOrderStatusIcon,
  getOrderStatusLabel,
} from "../utils/orderStatusHelpers";
import { Icon } from "@/components/base/icon";

interface MyOrderCardHeaderProps {
  order: OrderItem;
}

const MyOrderCardHeader: React.FC<MyOrderCardHeaderProps> = (props) => {
  const { order } = props;

  const orderLifecycleStatus = order.lifecycleStatus;
  const orderStatusIcon = getOrderStatusIcon(orderLifecycleStatus);
  const { bg, text } = getOrderStatusColor(orderLifecycleStatus);

  return (
    <div className="flex items-center gap-2 w-full px-4 py-2">
      <div className={cn("size-8 fall rounded-xl", bg)}>
        <Icon name={orderStatusIcon} size="lg" className="text-white" />
      </div>
      <p className={cn("font-bold", text)}>
        {getOrderStatusLabel(orderLifecycleStatus)}
      </p>
      <div className="ml-auto flex flex-col items-end">
        <span className="text-n-800 text-right">Order Id</span>
        <p className="font-medium text-n-900">{order.orderNumber}</p>
      </div>
    </div>
  );
};

export default MyOrderCardHeader;
