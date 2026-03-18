import { BaseApiResponse } from "@/types/baseApi.types";
import type { ButtonProps } from "@/components/base/button/button.types";

export type MediaUploadResponse = BaseApiResponse<{
  id: string;
  originalName: string;
  fileName: string;
  s3Url: string;
  mimeType: string;
  fileSize: number;
  type: string;
  group: string;
  platformType: string;
  uploadedBy: string;
  uploaderType: string;
  processingStatus: string | null;
  duration: number | null;
  width: number | null;
  height: number | null;
  variants: unknown | null;
  thumbnailUrls: unknown | null;
  parentMediaFileId: string | null;
  createdAt: string;
  updatedAt: string;
}>;

export type MediaUploaderProps = {
  /** Passed as `group` field in FormData to the upload API */
  group: string;
  /** Called with the uploaded image URL on successful upload */
  onUpload: (url: string) => void;
  /** Called when the user clears an already-uploaded image */
  onRemove?: () => void;
  /** Max allowed file size in MB. Defaults to 5 */
  maxSizeMb?: number;
  /** className applied to the outer wrapper div */
  wrapperClassName?: string;
  /** className applied to the placeholder container */
  placeholderClassName?: string;
  /** className applied to the uploaded/preview image element */
  imageClassName?: string;
  /** Pre-existing image URL to show instead of the placeholder */
  defaultImage?: string;
  uploadVariant?: "button" | "image-placeholder";
  buttonText?: string;
} & Pick<ButtonProps, "disabled" | "isLoading" | "size" | "variant">;
