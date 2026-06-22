import { Icon } from "@/components/base/icon/Icon";
import type { SummaryCharge } from "@/types/general.types";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";

interface TaxBreakdownProps {
  /** Individual tax charges (e.g. CGST, SGST, IGST) from the summary. */
  taxes: Pick<SummaryCharge, "key" | "label" | "amount">[];
}

export function TaxBreakdown({ taxes }: TaxBreakdownProps) {
  const taxToggle = useToggle();
  const total = taxes.reduce((sum, tax) => sum + tax.amount, 0);

  if (total <= 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={taxToggle.toggle}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-1">
          <p className="text-sm text-n-900">Taxes</p>
          <Icon
            name="ChevronDown"
            size="xs"
            className={`text-n-900 transition-transform duration-300 ${taxToggle.isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <p className="text-sm font-semibold text-n-900">
          {formatCurrency(total)}
        </p>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${taxToggle.isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden py-1">
          <div className="flex flex-col gap-2 pl-3 border-l-2 border-n-300">
            {taxes
              .filter((tax) => tax.amount > 0)
              .map((tax) => (
                <div key={tax.key} className="flex justify-between">
                  <p className="text-n-900">{tax.label}</p>
                  <p className="font-medium text-n-900">
                    {formatCurrency(tax.amount)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
