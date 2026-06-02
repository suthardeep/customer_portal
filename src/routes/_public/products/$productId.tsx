import { CreateAffiliateButton } from "@/features/products/components/CreateAffiliateButton";
import { SimilarProducts } from "@/features/products/components/SimilarProducts";
import { ProductReviews } from "@/features/products/components/ProductReviews";
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
import { MOCK_PRODUCT_FEATURES } from "@/features/products/constants";
import { productQueries } from "@/features/products/productQueries";
import type { ProductVariant } from "@/features/products/types";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  jsonLdScript,
} from "@/utils/jsonLd";
import { APP_NAME, APP_URL, buildMeta, truncateDescription } from "@/utils/seo";
import { toast } from "@/utils/toast";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const productDetailSearchSchema = z.object({
  variantId: z.string().optional(),
  quantity: z.number().int().min(1).optional(),
  affiliateCode: z.string().optional(),
  _minQtyCorrected: z.boolean().optional(),
  isAd: z.boolean().optional(),
});

export const Route = createFileRoute("/_public/products/$productId")({
  validateSearch: productDetailSearchSchema,
  loaderDeps: ({ search }) => ({
    variantId: search.variantId,
    quantity: search.quantity,
    isAd: search.isAd,
  }),
  loader: async ({ context, params, deps }) => {
    const product = await context.queryClient.ensureQueryData(
      productQueries.detail(params.productId, deps.isAd),
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
    const min = product.minOrderQuantity ?? 1;
    const quantityProvided = deps.quantity !== undefined;
    const effectiveQuantity = deps.quantity ?? 1;
    if (effectiveQuantity < min) {
      throw redirect({
        to: ".",
        search: (prev) => ({
          ...prev,
          quantity: min,
          _minQtyCorrected: quantityProvided ? true : undefined,
        }),
        replace: true,
      });
    }
    return product;
  },
  head: ({ loaderData: product }) => {
    if (!product) return {};
    const pageUrl = `${APP_URL}/products/${product.id}`;
    const breadcrumbItems = [
      { name: "Home", url: APP_URL },
      ...(product.categories?.map((c) => ({
        name: c.name,
        url: `${APP_URL}/categories/${c.id}`,
      })) ?? []),
      { name: product.name, url: pageUrl },
    ];
    return {
      meta: buildMeta({
        title: `${product.name} — ${APP_NAME}`,
        description: truncateDescription(product.description),
        image: product.mediaUrls?.[0],
        url: pageUrl,
        type: "product",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdScript(buildProductJsonLd(product, pageUrl)),
        },
        {
          type: "application/ld+json",
          children: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbItems)),
        },
      ],
    };
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
  }),
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
    _minQtyCorrected,
    isAd,
  } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: product } = useSuspenseQuery(productQueries.detail(productId, isAd));

  useEffect(() => {
    if (_minQtyCorrected && product.minOrderQuantity) {
      toast.info(`Minimum order quantity is ${product.minOrderQuantity} units`);
      navigate({
        search: (prev) => ({ ...prev, _minQtyCorrected: undefined }),
        replace: true,
      });
    }
  }, [_minQtyCorrected]);

  const variantId = searchVariantId ?? product.variants[0]?.id;

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
            productImage={product.mediaUrls?.[0]}
            productDescription={product.description}
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
                quantity={quantity ?? 1}
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
                  productImage={product.mediaUrls?.[0]}
                  productDescription={product.description}
                />
              </div>
            </div>
            <div className="w-full space-y-3">
              <DeliveryInfo />

              <ProductBadges
                features={features}
                returnPolicy={product.returnPolicy}
              />
            </div>
          </div>

          <ProductVariantSelector
            optionGroups={product.optionGroups}
            variants={product.variants}
            sizeChartId={product.sizeChartId}
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

      {/* Reviews */}
      <div id="reviews" className="mt-8">
        <ProductReviews
          productId={productId}
          productName={product.name}
          totalReviews={product.totalReviews}
          avgRating={product.avgRating}
          productImageUrl={product.mediaUrls?.[0]}
        />
      </div>

      {/* Similar / Complementary Products */}
      <SimilarProducts productId={productId} />
    </div>
  );
}
