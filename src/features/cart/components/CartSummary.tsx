import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Cart } from "../types/types";
import { Image } from "@/components/base/Image";
import Divider from "@/components/base/Divider";
import ApplyCouponsDialog from "./ApplyCouponsDialog";

export function CartSummary({ cart }: CartSummaryProps) {
  const gstToggle = useToggle();
  const applyCouponToggle = useToggle();

  const itemsTotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
  const totalMrp = cart.items.reduce(
    (acc, item) => acc + Number(item.mrp) * item.quantity,
    0,
  );
  const discount = totalMrp - itemsTotal;
  const taxes = 20;
  const grandTotal = itemsTotal + taxes;
  const totalCoins = cart.items.reduce(
    (acc, item) => acc + item.aavakCoinsEarned * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-n-400 bg-n-50">
      {/* Apply Coupons section */}
      <div className="p-4">
        <div className="mt-3 flex items-center justify-between rounded-xl border border-n-400 bg-n-200 px-3 py-2.5">
          <div
            onClick={applyCouponToggle.open}
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <div className="size-5">
              <Image src="/discount-3d-badge.png" alt="discount-3d-badge-alt" />
            </div>
            <p className="text-sm font-medium text-n-900 mr-auto">
              Apply Coupon
            </p>
            <button className="text-sm font-semibold text-s-700 transition-colors hover:underline">
              View All
            </button>
          </div>
        </div>
      </div>

      <hr className="border-n-200" />

      {/* Price Summary */}
      <div className="flex flex-col gap-3 p-4">
        <p className="font-semibold text-n-900">Price Summary</p>

        <SummaryRow label="Items Total" value={formatCurrency(itemsTotal)} />

        <SummaryRow
          label="Total MRP (incl. of taxes)"
          value={formatCurrency(totalMrp)}
        />

        {(discount ?? 0) > 0 && (
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <p className="text-sm text-n-800">All Discount</p>
              <Icon name="ChevronDown" size="xs" className="text-n-800" />
            </div>
            <p className="text-sm font-medium text-success-600">
              -{formatCurrency(discount)}
            </p>
          </div>
        )}

        <SummaryRow
          label="Include all taxes"
          value={`+${taxes}`}
          valueClass="font-medium text-danger-600"
        />

        <SummaryRow
          label="Delivery Charges"
          value="Free"
          valueClass="font-medium text-success-600"
        />
        <Divider />
        <div className="flex justify-between">
          <p className="font-semibold text-n-1000">Grand Total</p>
          <h6 className="font-bold text-n-900">{formatCurrency(grandTotal)}</h6>
        </div>
      </div>

      <hr className="border-n-200" />

      {/* Add GST Number accordion */}
      <div className="p-4">
        <button
          onClick={gstToggle.toggle}
          className="flex w-full items-center justify-between rounded-xl border border-n-400 bg-n-200 px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <div className="size-6 min-w-6">
              <Image src="/notes-3d-icon.png" alt="coin" eager />
            </div>
            <p className="font-medium text-n-800">Add GST Number</p>
          </div>
          <Icon
            name={gstToggle.isOpen ? "ChevronUp" : "ChevronDown"}
            size="sm"
            className="text-n-500"
          />
        </button>

        {gstToggle.isOpen && (
          <input
            type="text"
            placeholder="Enter GST Number"
            className="mt-3 w-full rounded-lg border border-n-300 bg-white px-3 py-2 text-sm text-n-900 placeholder:text-n-400 focus:border-p-400 focus:outline-none"
          />
        )}
      </div>

      {/* Earning Coins banner */}
      {(totalCoins ?? 0) > 0 && (
        <div className="mx-4 mb-4 flex items-start gap-2 rounded-xl border border-(--s-200) bg-s-50 p-3">
          <div className="size-6 min-w-6">
            <Image src="/aavak-coin-v1.png" alt="coin" eager />
          </div>
          <div>
            <p className="text-sm font-semibold text-s-800">
              You're Earning {totalCoins} coins
            </p>
            <p className="mt-0.5 text-xs text-s-600">
              Your {totalCoins} aavak coins unlock exciting discount and future
              beauty treats!
            </p>
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="p-4 pt-0">
        <Button variant="filled" color="primary" size="lg" fullWidth>
          Continue
        </Button>
      </div>
      <ApplyCouponsDialog
        isOpen={applyCouponToggle.isOpen}
        onClose={applyCouponToggle.close}
      />
    </div>
  );
}

interface CartSummaryProps {
  cart: Cart;
}

interface SummaryRowProps {
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
}

function SummaryRow({ label, value, labelClass, valueClass }: SummaryRowProps) {
  return (
    <div className="flex justify-between">
      <p className={`text-sm ${labelClass ?? "text-n-800"}`}>{label}</p>
      <p className={`text-sm ${valueClass ?? "font-semibold text-n-900"}`}>
        {value}
      </p>
    </div>
  );
}
