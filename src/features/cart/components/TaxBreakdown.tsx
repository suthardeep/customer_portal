import { Icon } from "@/components/base/icon/Icon";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";

interface TaxBreakdownProps {
  cgst: number;
  sgst: number;
  igst: number;
}

export function TaxBreakdown({ cgst, sgst, igst }: TaxBreakdownProps) {
  const taxToggle = useToggle();
  const total = cgst + sgst + igst;

  if (total <= 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={taxToggle.toggle}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-1">
          <p className="text-sm text-n-800">Taxes</p>
          <Icon
            name="ChevronDown"
            size="xs"
            className={`text-n-800 transition-transform duration-300 ${taxToggle.isOpen ? "rotate-180" : "rotate-0"}`}
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
            {cgst > 0 && (
              <div className="flex justify-between">
                <p className="text-n-800">CGST</p>
                <p className="font-medium text-n-800">{formatCurrency(cgst)}</p>
              </div>
            )}
            {sgst > 0 && (
              <div className="flex justify-between">
                <p className="text-n-800">SGST</p>
                <p className="font-medium text-n-800">{formatCurrency(sgst)}</p>
              </div>
            )}
            {igst > 0 && (
              <div className="flex justify-between">
                <p className="text-n-800">IGST</p>
                <p className="font-medium text-n-800">{formatCurrency(igst)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
