import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/utils/cssHelpers";
import { prettyDate } from "@/utils/formatDateTime";
import type { ProductOffer } from "../types/types";

interface OfferCardProps {
  offer: ProductOffer;
  onApply?: () => void;
}

export function OfferCard({ offer, onApply }: OfferCardProps) {
  const expandToggle = useToggle();
  const termsDialog = useToggle();

  const isExpired = offer.validUntil && new Date(offer.validUntil) < new Date();

  return (
    <>
      <div
        className={cn(
          "rounded-lg border border-n-200 bg-white p-2 transition-all",
          isExpired && "opacity-60",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h6 className="font-medium text-n-900 mb-1">{offer.title}</h6>
              {!isExpired && onApply && (
                <Button
                  variant="ghost"
                  color="primary"
                  size="sm"
                  onClick={onApply}
                >
                  Apply
                </Button>
              )}
            </div>

            {!expandToggle.isOpen && (
              <p className="text-sm text-n-800 line-clamp-2">
                {offer.description}
              </p>
            )}

            {expandToggle.isOpen && (
              <div className="space-y-2 mt-2">
                <p className="text-sm text-n-600">{offer.description}</p>

                {offer.code && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-n-600">Code:</span>
                    <code className="px-2 py-1 text-sm font-mono bg-n-100 border border-n-300 rounded">
                      {offer.code}
                    </code>
                  </div>
                )}

                {offer.minPurchase && (
                  <p className="text-sm text-n-600">
                    Minimum purchase: ₹{offer.minPurchase}
                  </p>
                )}

                {offer.validUntil && (
                  <p className="text-sm text-n-600">
                    Valid until:{" "}
                    {prettyDate(offer.validUntil, {
                      showDate: true,
                      showYear: true,
                    })}
                  </p>
                )}

                {offer.termsLink && (
                  <button
                    onClick={termsDialog.open}
                    className="text-sm text-p-600 hover:text-p-700 hover:underline"
                  >
                    Terms & Conditions
                  </button>
                )}
              </div>
            )}

            <button
              onClick={expandToggle.toggle}
              className="mt-2 text-sm font-medium text-p-600 hover:text-p-700"
            >
              {expandToggle.isOpen ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>

      {/* Terms Dialog */}
      <Dialog
        isOpen={termsDialog.isOpen}
        onClose={termsDialog.close}
        title="Terms & Conditions"
        size="md"
      >
        <div className="prose-content">
          <p>
            Terms and conditions for this offer would be loaded from{" "}
            {offer.termsLink}
          </p>
        </div>
      </Dialog>
    </>
  );
}
