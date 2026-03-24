import { Image } from "@/components/base/Image";
import Sheet from "@/components/base/sheet/Sheet";
import { useToggle } from "@/hooks/useToggle";
import type { TaggedProduct } from "../types/types";
import { SpotlightTaggedProductCard } from "./SpotlightTaggedProductCard";

interface SpotlightTaggedProductsMobileStackProps {
  products: TaggedProduct[];
}

const MAX_PREVIEW = 3;

export function SpotlightTaggedProductsMobileStack({
  products,
}: SpotlightTaggedProductsMobileStackProps) {
  const sheet = useToggle();

  if (products.length === 0) return null;

  const previewProducts = products.slice(0, MAX_PREVIEW);
  const extraCount = products.length - MAX_PREVIEW;

  return (
    <>
      <button
        onClick={sheet.open}
        aria-label="View tagged products"
        className="relative flex items-center"
        style={{ width: `${32 + (previewProducts.length - 1) * 22}px`, height: "40px" }}
      >
        {previewProducts.map((product, index) => (
          <div
            key={product.id}
            className="absolute size-10 rounded-xl border-2 border-white bg-n-100 overflow-hidden shadow-sm"
            style={{ left: `${index * 22}px`, zIndex: index }}
          >
            <Image
              src={product.mediaUrls?.[0] ?? ""}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>
        ))}
        {extraCount > 0 && (
          <div
            className="absolute size-10 rounded-xl border-2 border-white bg-n-200 flex items-center justify-center shadow-sm"
            style={{ left: `${previewProducts.length * 22}px`, zIndex: previewProducts.length }}
          >
            <span className="text-xs font-semibold text-n-700">+{extraCount}</span>
          </div>
        )}
      </button>

      <Sheet
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        title="Tagged Products"
        direction="bottom"
      >
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <SpotlightTaggedProductCard key={product.id} product={product} />
          ))}
        </div>
      </Sheet>
    </>
  );
}
