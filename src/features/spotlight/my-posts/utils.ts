import { type ChipColor } from "@/components/base/chip/chip.types";
import { PostStatus } from "../types/enums";

export const getStatusLabel = (status: PostStatus): string => {
  const labels: Record<PostStatus, string> = {
    [PostStatus.PENDING_REVIEW]: "Pending Review",
    [PostStatus.PUBLISHED]: "Published",
    [PostStatus.REJECTED]: "Rejected",
    [PostStatus.ARCHIVED]: "Archived",
  };

  return labels[status];
};

export const getStatusChipColor = (status: PostStatus): ChipColor => {
  const colors: Record<PostStatus, ChipColor> = {
    [PostStatus.PENDING_REVIEW]: "orange",
    [PostStatus.PUBLISHED]: "success",
    [PostStatus.REJECTED]: "danger",
    [PostStatus.ARCHIVED]: "neutral",
  };

  return colors[status];
};
