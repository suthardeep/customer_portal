import { Icon } from "./icon";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
}

const iconSizeMap = {
  sm: "md" as const, // 16px
  md: "lg" as const, // 20px
  lg: "lg" as const, // 20px (will override with className for 24px)
};

const customSizeClass = {
  sm: "",
  md: "",
  lg: "size-6", // 24px override for lg
};

export function StarRating({
  rating,
  reviewCount,
  size = "md",
}: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const iconSize = iconSizeMap[size];
  const sizeClass = customSizeClass[size];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Icon
        key={`full-${i}`}
        name="Star"
        size={iconSize}
        className={
          sizeClass
            ? `text-yellow-500 fill-yellow-500 ${sizeClass}`
            : "text-yellow-500 fill-yellow-500"
        }
      />,
    );
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(
      <Icon
        key="half"
        name="StarHalf"
        size={iconSize}
        className={
          sizeClass ? `text-yellow-500 ${sizeClass}` : "text-yellow-500"
        }
      />,
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon
        key={`empty-${i}`}
        name="Star"
        size={iconSize}
        className={sizeClass ? `text-n-500 ${sizeClass}` : "text-n-500"}
      />,
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div
        className="flex items-center"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {stars}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-n-600">({reviewCount})</span>
      )}
    </div>
  );
}
