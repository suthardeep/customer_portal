import { Button } from "@/components/base/button/Button";
import { ProductNotFound } from "@/features/products/components/ProductNotFound";
import { DeliveryInfo } from "@/features/products/components/DeliveryInfo";
import { OffersList } from "@/features/products/components/OffersList";
import { ProductActionButtons } from "@/features/products/components/ProductActionButtons";
import { ProductBadges } from "@/features/products/components/ProductBadges";
import { ProductBreadcrumb } from "@/features/products/components/ProductBreadcrumb";
import { ProductDetailHeader } from "@/features/products/components/ProductDetailHeader";
import { ProductImageGallery } from "@/features/products/components/ProductImageGallery";
import { ProductTabs } from "@/features/products/components/ProductTabs";
import { ProductTopBar } from "@/features/products/components/ProductTopBar";
import { ProductVariantSelector } from "@/features/products/components/ProductVariantSelector";
import { ProductDetailSkeleton } from "@/features/products/components/skeletons/ProductDetailSkeleton";
import {
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

export const Route = createFileRoute("/_public/product/$productId")({
  validateSearch: productDetailSearchSchema,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      productQueries.detail(params.productId),
    );
  },
  pendingComponent: ProductDetailSkeleton,
  component: ProductDetailComponent,
  errorComponent: () => <ProductNotFound />,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const { variantId, quantity } = Route.useSearch();
  const { data: product } = useSuspenseQuery(productQueries.detail(productId));

  const selectedVariant: ProductVariant | undefined = (() => {
    if (!product.variants?.length) return undefined;
    if (variantId) {
      return (
        product.variants.find((v) => v.id === variantId) ?? product.variants[0]
      );
    }
    return product.variants[0];
  })();

  const isOutOfStock = selectedVariant
    ? !selectedVariant.inStock || selectedVariant.quantity <= 0
    : false;

  // Use mock data for features not yet available from API
  const features = product.features || MOCK_PRODUCT_FEATURES;
  const offers = product.offers || MOCK_PRODUCT_OFFERS;

  const galleryImages = selectedVariant?.mediaUrls?.length
    ? selectedVariant.mediaUrls
    : (product.mediaUrls ?? []);

  return (
    <div className="container mx-auto px-4 pt-6 pb-28 lg:pb-6">
      {/* Breadcrumb */}
      <ProductBreadcrumb product={product} />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 items-start mt-6">
        <div>
          {/* Left: Image Gallery */}
          <ProductImageGallery images={galleryImages} />
          <div className="mt-8 hidden lg:block">
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
              <ProductActionButtons
                variantId={selectedVariant?.id}
                quantity={quantity}
                disabled={isOutOfStock}
                max={selectedVariant?.quantity}
              />
              <Button variant="outline" className="mt-2" fullWidth>
                Create Affiliate
              </Button>
            </div>
            <div className="w-full space-y-3">
              <DeliveryInfo />
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
