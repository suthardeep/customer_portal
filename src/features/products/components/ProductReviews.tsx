import { StarRatingDisplay } from "@/components/base/StarRatingDisplay";
import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import FallbackView from "@/components/empty-states/FallbackView";
import Sheet from "@/components/base/sheet/Sheet";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialogStore } from "@/features/auth/stores/loginDialogStore";
import { AddEditReviewSheet } from "@/features/reviews/components/AddEditReviewSheet";
import { useCreateReviewMutation } from "@/features/reviews/reviewsMutations";
import type { ReviewFormData } from "@/features/reviews/schemas/reviewFormSchema";
import { useToggle } from "@/hooks/useToggle";
import { formatCompactNumber } from "@/utils/formatCompactNumber";
import { prettyDate } from "@/utils/formatDateTime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { productQueries } from "../productQueries";
import type { ProductReview } from "../types/review.types";
import { ProductReviewsSkeleton } from "./skeletons/ProductReviewsSkeleton";

type Props = {
  productId: string;
  productName: string;
  totalReviews: number;
  avgRating: number;
  productImageUrl?: string;
};

const RATING_STARS = [5, 4, 3, 2, 1] as const;

function ReviewCard({ review }: { review: ProductReview }) {
  const initials = review.customer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-p-100 flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-p-600">{initials}</span>
        </div>
        <p className="font-semibold text-n-900">{review.customer.name}</p>
      </div>

      <StarRatingDisplay rating={review.rating} size="sm" />
      <p className="text-xs text-n-800">
        Reviewed on{" "}
        {prettyDate(review.createdAt, { disableRelativeDates: true })}
      </p>

      {review.mediaUrls && review.mediaUrls.length > 0 && (
        <div className="w-24 h-20 rounded-lg bg-n-100 flex items-center justify-center border border-n-200">
          <Icon name="Image" size="lg" className="text-n-400" />
        </div>
      )}

      {review.title && (
        <h6 className="font-semibold text-n-900">{review.title}</h6>
      )}
      {review.description && (
        <p className="text-sm text-n-700">{review.description}</p>
      )}
    </div>
  );
}

function ProductReviewsContent({
  productId,
  productName,
  totalReviews,
  avgRating,
  productImageUrl,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(productQueries.reviews({ productId }));

  const { isAuthenticated } = useAuth();
  const openLoginDialog = useLoginDialogStore((s) => s.open);
  const reviewSheet = useToggle();
  const createReviewMutation = useCreateReviewMutation();

  useEffect(() => {
    if (createReviewMutation.isSuccess) {
      reviewSheet.close();
      createReviewMutation.reset();
    }
  }, [createReviewMutation.isSuccess]);

  const handleReviewSubmit = (formData: ReviewFormData) => {
    createReviewMutation.mutate({
      productId,
      rating: formData.rating,
      title: formData.title,
      description: formData.description,
      mediaUrls: formData.mediaUrls,
    });
  };

  const allReviews = data?.pages.flatMap((page) => page.data) ?? [];
  const firstPageMeta = data?.pages[0]?.meta;
  const ratingDistribution = firstPageMeta?.ratingDistribution;

  return (
    <>
      {allReviews.length === 0 ? (
        <FallbackView
          icon="Star"
          title="No reviews yet"
          subtitle="Be the first to share your experience"
          footer={
            <Button variant="outline" size="sm" onClick={reviewSheet.open}>
              Write a review
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Rating Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-n-900">
                {avgRating.toFixed(1)}
              </span>
              <Icon
                name="Star"
                size="lg"
                className="text-yellow-500 fill-yellow-500"
              />
            </div>
            <p className="text-sm text-n-600">
              {formatCompactNumber(totalReviews)} Global rating
            </p>

            <Button variant="outline" size="sm" onClick={reviewSheet.open}>
              Write a review
            </Button>

            <div className="space-y-2 mt-2">
              {RATING_STARS.map((star) => {
                const count =
                  ratingDistribution?.[
                    String(star) as "1" | "2" | "3" | "4" | "5"
                  ] ?? 0;
                const total = firstPageMeta?.totalRows ?? 0;
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <Icon
                      name="Star"
                      size="xs"
                      className="text-yellow-500 fill-yellow-500 shrink-0"
                    />
                    <span className="text-sm text-n-800 w-3 shrink-0">
                      {star}
                    </span>
                    <span className="text-xs text-n-500 w-12 shrink-0">
                      ({formatCompactNumber(count)})
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-n-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Review List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-n-900 text-lg">Ratings</p>
              {hasNextPage && (
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-n-600 hover:text-n-900 transition-colors"
                >
                  See all
                  <Icon name="ChevronRight" size="xs" />
                </button>
              )}
            </div>

            <div className="space-y-6 divide-y divide-n-100">
              {allReviews.map((review) => (
                <div key={review.id} className="pt-4 first:pt-0">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {hasNextPage && (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="flex items-center gap-1 text-sm font-semibold text-n-800 hover:text-n-900 transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "See all Reviews"}
                {!isFetchingNextPage && <Icon name="ChevronRight" size="xs" />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Review Sheet */}
      {isAuthenticated ? (
        <AddEditReviewSheet
          mode="add"
          isOpen={reviewSheet.isOpen}
          onClose={reviewSheet.close}
          productName={productName}
          productImageUrl={productImageUrl}
          onSubmit={handleReviewSubmit}
          isMutating={createReviewMutation.isPending}
        />
      ) : (
        <Sheet
          isOpen={reviewSheet.isOpen}
          onClose={reviewSheet.close}
          title="Write a Review"
          size="xl"
        >
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <Icon name="User" size="lg" className="text-n-400" />
            <p className="font-medium text-n-800">
              Please login to submit a review
            </p>
            <Button
              onClick={() => {
                reviewSheet.close();
                openLoginDialog();
              }}
            >
              Login
            </Button>
          </div>
        </Sheet>
      )}
    </>
  );
}

export function ProductReviews(props: Props) {
  return (
    <Suspense fallback={<ProductReviewsSkeleton />}>
      <ProductReviewsContent {...props} />
    </Suspense>
  );
}
