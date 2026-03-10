import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/base/icon/Icon";
import { QUICK_ACTION_CARDS } from "../constants";

export function QuickActionCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {QUICK_ACTION_CARDS.map((card) => (
        <Link
          key={card.to}
          to={card.to}
          className="flex flex-col items-center gap-2 rounded-lg bg-n-100 p-4 text-n-900 transition-colors hover:bg-n-300/70 border border-n-400"
          activeProps={{
            className: "bg-p-50! border-p-500 text-p-900",
          }}
        >
          <Icon name={card.icon} size="lg" className="text-inherit" />
          <span className="text-sm font-medium ">{card.label}</span>
        </Link>
      ))}
    </div>
  );
}
