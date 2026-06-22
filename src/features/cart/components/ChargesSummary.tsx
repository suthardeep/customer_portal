import type { SummaryCharge } from "@/types/general.types";
import { formatCurrency } from "@/utils/formatCurrency";
import { TaxBreakdown } from "./TaxBreakdown";

interface ChargesSummaryProps {
  /** Ordered price-summary line items from the backend (offers, delivery, taxes, fees). */
  charges: SummaryCharge[];
}

/**
 * Renders the backend-driven price-summary lines from `charges[]`.
 * Non-tax charges render as individual rows (preserving backend order); all
 * tax charges are grouped into the collapsible TaxBreakdown. Rendering from
 * this array — rather than cherry-picked flat fields — ensures the displayed
 * rows sum to `amountToPay`, including offer discounts that have no flat field.
 */
export function ChargesSummary({ charges }: ChargesSummaryProps) {
  const taxes = charges.filter((charge) => charge.type === "TAX");
  const lineCharges = charges.filter((charge) => charge.type !== "TAX");

  return (
    <>
      {lineCharges.map((charge) => (
        <ChargeRow key={charge.key} charge={charge} />
      ))}
      <TaxBreakdown taxes={taxes} />
    </>
  );
}

function ChargeRow({ charge }: { charge: SummaryCharge }) {
  const isDiscount = charge.sign === "negative";
  const prefix = isDiscount ? "-" : "+";
  const valueClass = isDiscount
    ? "font-medium text-success-600"
    : "font-semibold text-n-900";

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-n-900">{charge.label}</p>
        {charge.detail && (
          <p className="mt-0.5 text-xs text-n-800">{charge.detail}</p>
        )}
      </div>
      <p className={`shrink-0 text-sm ${valueClass}`}>
        {prefix}
        {formatCurrency(charge.amount)}
      </p>
    </div>
  );
}
