import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import Divider from "@/components/base/Divider";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { StarRatingDisplay } from "@/components/base/StarRatingDisplay";
import { StarRatingInput } from "@/components/base/StarRatingInput";
import { AddEditReviewSheet } from "@/features/reviews/components/AddEditReviewSheet";
import { useCreateReviewMutation } from "@/features/reviews/reviewsMutations";
import { reviewQueries } from "@/features/reviews/reviewsQueries";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { prettyDate } from "@/utils/formatDateTime";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PAYMENT_METHOD_LABEL } from "../constants";
import type { OrderItem } from "../types/types";
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
  console.log(myReviews, "myReviews");

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
          <p className="line-clamp-1 font-medium text-n-800">
            {formatCurrency(order.amount)}
          </p>
          <div className="flex items-center gap-5">
            {order.customerEarnedCoins > 0 && (
              <AavakCoinsChip
                coins={order.customerEarnedCoins}
                label="Earned"
              />
            )}
            <div className="flex items-center gap-1">
              <Icon name="CreditCard" size="lg" />
              <p className="text-n-900 text-sm uppercase font-medium">
                {PAYMENT_METHOD_LABEL[order.paymentMethod]}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size="lg" />
              <p className="text-n-900 text-sm uppercase font-medium">
                {prettyDate(order.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {enableRating && (
        <div className="p-2 pt-0 w-full">
          <div
            className="w-full rounded-xl bg-p-50 px-4 py-3 flex items-center gap-4"
            onClick={(e) => e.preventDefault()}
          >
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
            key={existingReview?.reviewId ?? triggerRating}
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
                  mediaUrls: [],
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
