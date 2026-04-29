import { Icon } from "@/components/base/icon/Icon";
import { AavakCoinsApply } from "./AavakCoinsApply";
import type { PaymentMethod } from "../types/types";
import { PAYMENT_OPTIONS } from "../constants";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  isFullyCoveredByCoins: boolean;
  isCoinsApplied: boolean;
  amountToPay: number;
  coinsApplied?: number;
  onApplyCoins: (coins: number) => void;
  onRemoveCoins: () => void;
}

export function PaymentMethodSelector({
  value,
  onChange,
  isFullyCoveredByCoins,
  isCoinsApplied,
  amountToPay,
  coinsApplied,
  onApplyCoins,
  onRemoveCoins,
}: PaymentMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-n-900">Payment Method</p>
      <AavakCoinsApply
        isApplied={isCoinsApplied}
        amountToPay={amountToPay}
        coinsApplied={coinsApplied}
        onApply={onApplyCoins}
        onRemove={onRemoveCoins}
      />
      {!isFullyCoveredByCoins && (
      <div className="flex flex-col md:flex-row w-full gap-2">
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 w-full rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                isSelected
                  ? "border-p-500 bg-p-50/50"
                  : "border-n-400 bg-n-50 hover:border-n-500"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                  isSelected ? "bg-p-100" : "bg-n-200"
                }`}
              >
                <Icon
                  name={option.icon}
                  size="md"
                  className={isSelected ? "text-p-600" : "text-n-600"}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`font-semibold ${isSelected ? "text-p-700" : "text-n-900"}`}
                >
                  {option.label}
                </p>
                <p className="mt-0.5 text-sm text-n-800">
                  {option.description}
                </p>
              </div>

              <div
                className={`size-5 shrink-0 rounded-full border-2 ${
                  isSelected ? "border-p-500 bg-p-500" : "border-n-400 bg-white"
                } flex items-center justify-center`}
              >
                {isSelected && <div className="size-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>
      )}
    </div>
  );
}
