import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { OptionValuesRenderer } from "@/components/base/OptionValuesRenderer";
import Divider from "@/components/base/Divider";
import { Image } from "@/components/base/Image";
import { StarRatingDisplay } from "@/components/base/StarRatingDisplay";
import { StarRatingInput } from "@/components/base/StarRatingInput";
import { AddEditReviewSheet } from "@/features/reviews/components/AddEditReviewSheet";
import { useCreateReviewMutation } from "@/features/reviews/reviewsMutations";
import { reviewQueries } from "@/features/reviews/reviewsQueries";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { OrderItem } from "../types/types";
import { getOrderStatusDateLabel } from "../utils";
import MyOrderCardHeader from "./MyOrderCardHeader";

interface MyOrdersCardProps {
  order: OrderItem;
  enableRating?: boolean;
}

export function MyOrdersCard({
  order,
  enableRating = false,
}: MyOrdersCardProps) {
  const reviewSheet = useToggle();
  const [triggerRating, setTriggerRating] = useState(0);
  const createReviewMutation = useCreateReviewMutation();
  const { data: myReviewsData } = useQuery(reviewQueries.myReviews());
  const myReviews = myReviewsData?.data ?? [];

  const existingReview = Array.isArray(myReviews)
    ? myReviews.find((r) => r.productId === order.orderItemId)
    : undefined;

  const handleStarClick = (rating: number) => {
    setTriggerRating(rating);
    reviewSheet.open();
  };

  const handleClose = () => {
    setTriggerRating(0);
    reviewSheet.close();
  };

  return (
    <Link
      to="/account/my-orders/$orderItemId"
      params={{ orderItemId: order.orderItemId }}
      className="flex flex-col items-start rounded-xl border border-n-400 bg-n-50  group"
    >
      <MyOrderCardHeader order={order} />
      <Divider />
      <div className="px-4 py-3 flex gap-4">
        <div className="size-24 shrink-0 overflow-hidden">
          <Image
            src={order.productImage}
            alt={order.productName}
            className="size-full object-cover rounded-xl"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 mt-1">
          <h6 className="line-clamp-1 font-medium group-hover:text-p-800">
            {order.productName}
          </h6>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-n-900">
              {formatCurrency(order.sellingPrice)}
            </p>
            {order.quantity > 1 && (
              <>
                <p className="text-n-800 font-medium">×{order.quantity}</p>
                <p className="font-semibold ml-1">
                  {formatCurrency(order.sellingPrice * order.quantity)}
                </p>
              </>
            )}
          </div>
          <OptionValuesRenderer optionValues={order.optionValues} />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5">
            {order.customerEarnedCoins > 0 && (
              <AavakCoinsChip
                coins={order.customerEarnedCoins}
                label="Earned"
              />
            )}
            <p className="text-n-900 text-sm font-medium">
              {getOrderStatusDateLabel(
                order.lifecycleStatus,
                order.createdAt,
                order.deliveredAt,
              )}
            </p>
          </div>
        </div>
      </div>
      {enableRating && (
        <div className="p-2 pt-0 w-full" onClick={(e) => e.preventDefault()}>
          <div className="w-full rounded-xl bg-p-50 px-4 py-3 flex items-center gap-4">
            <p className="text-n-900 font-medium">
              {existingReview ? "Your rating" : "Rate your experience"}
            </p>
            {existingReview ? (
              <button type="button" onClick={reviewSheet.open}>
                <StarRatingDisplay rating={existingReview.rating} size="md" />
              </button>
            ) : (
              <StarRatingInput
                value={triggerRating}
                onChange={handleStarClick}
                size="md"
              />
            )}
          </div>
          <AddEditReviewSheet
            key={existingReview?.id ?? triggerRating}
            mode={existingReview ? "edit" : "add"}
            isOpen={reviewSheet.isOpen}
            onClose={handleClose}
            productName={order.productName}
            productImageUrl={order.productImage}
            initialRating={existingReview?.rating ?? triggerRating}
            defaultValues={
              existingReview
                ? {
                    rating: existingReview.rating,
                    title: existingReview.title,
                    description: existingReview.description,
                  }
                : undefined
            }
            onSubmit={(data) => {
              if (!existingReview) {
                createReviewMutation.mutate({
                  productId: order.orderItemId,
                  orderId: order.orderId,
                  title: data.title,
                  description: data.description,
                  rating: data.rating,
                  mediaUrls: data.mediaUrls,
                });
              }
              reviewSheet.close();
            }}
            isMutating={createReviewMutation.isPending}
          />
        </div>
      )}
    </Link>
  );
}
