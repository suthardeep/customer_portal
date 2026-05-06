import { CreateAffiliateButton } from "@/features/products/components/CreateAffiliateButton";
import { DeliveryInfo } from "@/features/products/components/DeliveryInfo";
import { ProductActionButtons } from "@/features/products/components/ProductActionButtons";
import { ProductBadges } from "@/features/products/components/ProductBadges";
import { ProductBreadcrumb } from "@/features/products/components/ProductBreadcrumb";
import { ProductDetailHeader } from "@/features/products/components/ProductDetailHeader";
import { ProductImageGallery } from "@/features/products/components/ProductImageGallery";
import { ProductNotFound } from "@/features/products/components/ProductNotFound";
import { ProductSellerInfo } from "@/features/products/components/ProductSellerInfo";
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
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const productDetailSearchSchema = z.object({
  variantId: z.string().optional(),
  quantity: z.number().int().min(1).optional().default(1),
  affiliateCode: z.string().optional(),
});

export const Route = createFileRoute("/_public/products/$productId")({
  validateSearch: productDetailSearchSchema,
  loaderDeps: ({ search }) => ({ variantId: search.variantId }),
  loader: async ({ context, params, deps }) => {
    const product = await context.queryClient.ensureQueryData(
      productQueries.detail(params.productId),
    );
    if (!deps.variantId && product.variants.length > 0) {
      throw redirect({
        to: ".",
        search: (prev) => ({
          ...prev,
          variantId: product.variants[0].id,
          quantity: product.minOrderQuantity ?? 1,
        }),
        replace: true,
      });
    }
  },
  pendingComponent: ProductDetailSkeleton,
  component: ProductDetailComponent,
  errorComponent: () => <ProductNotFound />,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const {
    variantId: searchVariantId,
    quantity,
    affiliateCode,
  } = Route.useSearch();
  const { data: product } = useSuspenseQuery(productQueries.detail(productId));

  const variantId = searchVariantId ?? product.variants[0];

  const selectedVariant: ProductVariant | undefined = (() => {
    if (!product.variants?.length) return undefined;
    if (variantId) {
      return product.variants.find((v) => v.id === variantId);
    }
    return product.variants[0];
  })();

  const isOutOfStock = selectedVariant ? selectedVariant.quantity <= 0 : false;

  // Use mock data for features not yet available from API
  const features = MOCK_PRODUCT_FEATURES;
  const offers = MOCK_PRODUCT_OFFERS;

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
              description={product.description}
              bulletPoints={product.bulletPoints}
              customFields={product.customFields}
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-6">
          <ProductTopBar
            brandName={product.brand?.name}
            brandId={product.brand?.id}
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
                productId={productId}
                variantId={selectedVariant?.id}
                quantity={quantity}
                disabled={isOutOfStock}
                min={product.minOrderQuantity}
                max={selectedVariant?.quantity}
                affiliateCode={affiliateCode}
              />
              <div className="mt-2">
                <CreateAffiliateButton
                  productId={productId}
                  variantId={selectedVariant?.id}
                  productName={product.name}
                />
              </div>
            </div>
            <div className="w-full space-y-3">
              <DeliveryInfo />
              <ProductBadges features={features} />
            </div>
          </div>

          <ProductVariantSelector
            optionGroups={product.optionGroups}
            variants={product.variants}
          />
          {/* <OffersList offers={offers} /> */}
          {product.seller && <ProductSellerInfo seller={product.seller} />}
        </div>
      </div>

      {/* Mobile-only tabs */}
      <div className="mt-6 lg:hidden">
        <ProductTabs
          description={product.description}
          bulletPoints={product.bulletPoints}
          customFields={product.customFields}
        />
      </div>
    </div>
  );
}
