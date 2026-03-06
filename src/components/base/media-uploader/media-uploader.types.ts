export interface MediaUploadResponse {
  id: string;
  url: string;
  type: string;
  group: string;
  fileSize: number;
  mimeType: string;
}

export interface MediaUploaderProps {
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
}
