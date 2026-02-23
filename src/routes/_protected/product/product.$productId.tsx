import { Button } from "@/components/base/button/Button";
import FallbackView from "@/components/empty-states/FallbackView";
import { DeliveryInfo } from "@/features/products/components/DeliveryInfo";
import { OffersList } from "@/features/products/components/OffersList";
import { ProductBadges } from "@/features/products/components/ProductBadges";
import { ProductBreadcrumb } from "@/features/products/components/ProductBreadcrumb";
import { ProductDetailHeader } from "@/features/products/components/ProductDetailHeader";
import { ProductImageGallery } from "@/features/products/components/ProductImageGallery";
import { ProductQuantitySelector } from "@/features/products/components/ProductQuantitySelector";
import { ProductTabs } from "@/features/products/components/ProductTabs";
import { ProductTopBar } from "@/features/products/components/ProductTopBar";
import { ProductVariantSelector } from "@/features/products/components/ProductVariantSelector";
import { ProductDetailSkeleton } from "@/features/products/components/skeletons/ProductDetailSkeleton";
import {
  MOCK_DELIVERY_INFO,
  MOCK_PRODUCT_FEATURES,
  MOCK_PRODUCT_OFFERS,
} from "@/features/products/constants";
import { productQueries } from "@/features/products/productQueries";
import type { ProductVariant } from "@/features/products/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const productDetailSearchSchema = z.object({
  variantId: z.string().optional(),
  quantity: z.number().int().min(1).optional().default(1),
});

export const Route = createFileRoute("/_protected/product/product/$productId")({
  validateSearch: productDetailSearchSchema,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      productQueries.detail(params.productId),
    );
  },
  pendingComponent: ProductDetailSkeleton,
  component: ProductDetailComponent,
  errorComponent: (err) => (
    <FallbackView title={err?.error?.message || "Something went wrong"} />
  ),
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const { variantId } = Route.useSearch();
  const { data: product } = useSuspenseQuery(productQueries.detail(productId));

  const selectedVariant: ProductVariant | undefined = (() => {
    if (!product.variants?.length) return undefined;
    if (variantId) {
      return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    }
    return product.variants[0];
  })();

  const isOutOfStock = selectedVariant
    ? !selectedVariant.inStock || selectedVariant.quantity <= 0
    : false;

  // Use mock data for features not yet available from API
  const delivery = product.delivery || MOCK_DELIVERY_INFO;
  const features = product.features || MOCK_PRODUCT_FEATURES;
  const offers = product.offers || MOCK_PRODUCT_OFFERS;

  const galleryImages = selectedVariant?.mediaUrls?.length
    ? selectedVariant.mediaUrls
    : (product.mediaUrls ?? []);

  const handleAddToCart = () => {
    console.log("Add to cart - Coming soon");
  };

  const handleBuyNow = () => {
    console.log("Buy now - Coming soon");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <ProductBreadcrumb product={product} />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-6">
        <div>
          {/* Left: Image Gallery */}
          <ProductImageGallery images={galleryImages} />
          <div className="mt-8">
            <ProductTabs
              highlights={product.highlights}
              specifications={product.specifications}
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-6">
          <ProductTopBar
            brandName={product.brandName}
            productName={product.name}
          />
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="w-full">
              <ProductDetailHeader
                product={product}
                selectedVariant={selectedVariant}
              />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="filled"
                  color="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  fullWidth
                >
                  Add to Cart
                </Button>
                <Button
                  color="secondary"
                  size="lg"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  fullWidth
                >
                  Buy Now
                </Button>
              </div>
              <Button variant="outline" className="mt-2" fullWidth>
                Create Affiliate
              </Button>
            </div>
            <div className="w-full space-y-3">
              <DeliveryInfo delivery={delivery} />
              <ProductQuantitySelector max={selectedVariant?.quantity} />
              <ProductBadges features={features} />
            </div>
          </div>

          <ProductVariantSelector
            variantAttributes={product.variantAttributes ?? []}
            variants={product.variants ?? []}
          />
          <OffersList offers={offers} />
        </div>
      </div>
    </div>
  );
}
