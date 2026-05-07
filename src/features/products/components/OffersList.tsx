import { useToggle } from "@/hooks/useToggle";
import { OfferCard } from "./OfferCard";
import type { ProductOffer } from "../types/types";

interface OffersListProps {
  offers?: ProductOffer[];
}

export function OffersList({ offers }: OffersListProps) {
  const expandToggle = useToggle();

  if (!offers || offers.length === 0) return null;

  // Filter out expired offers
  const activeOffers = offers.filter((offer) => {
    if (!offer.validUntil) return true;
    return new Date(offer.validUntil) >= new Date();
  });

  if (activeOffers.length === 0) return null;

  const displayedOffers = expandToggle.isOpen
    ? activeOffers
    : activeOffers.slice(0, 3);

  const hasMore = activeOffers.length > 3;

  return (
    <div className="space-y-1">
      <h5 className="font-semibold text-n-900">Offers</h5>

      <div className="space-y-2 bg-p-50 rounded-lg p-3 mt-2">
        <p className="mb-2">Available Offers & Coupons</p>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {displayedOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onApply={() => {}}
            />
          ))}
        </div>
      </div>

      {hasMore && (
        <button
          onClick={expandToggle.toggle}
          className="text-sm font-medium text-p-600 hover:text-p-700"
        >
          {expandToggle.isOpen
            ? "Show less"
            : `View all ${activeOffers.length} offers`}
        </button>
      )}
    </div>
  );
}
