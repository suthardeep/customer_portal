import { type ChipColor } from "@/components/base/chip/chip.types";
import { MediaStatus, PostStatus } from "../types/enums";

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

export const getMediaStatusLabel = (status: MediaStatus): string => {
  const labels: Record<MediaStatus, string> = {
    [MediaStatus.READY]: "Ready",
    [MediaStatus.PROCESSING]: "Processing",
    [MediaStatus.FAILED]: "Failed",
  };

  return labels[status];
};

export const getMediaStatusChipColor = (status: MediaStatus): ChipColor => {
  const colors: Record<MediaStatus, ChipColor> = {
    [MediaStatus.READY]: "success",
    [MediaStatus.PROCESSING]: "orange",
    [MediaStatus.FAILED]: "danger",
  };

  return colors[status];
};
