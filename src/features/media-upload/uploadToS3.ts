import type { MediaType, UploadPart, FinishPart } from "./types/types";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;

const SUPPORTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
]);

export function getMediaType(file: File): { type: MediaType; group: string } {
  if (!SUPPORTED_MIME_TYPES.has(file.type)) {
    throw new Error(
      `Unsupported file type: ${file.type}. Supported: JPEG, PNG, WEBP, MP4`,
    );
  }

  if (file.type.startsWith("video/")) {
    return { type: "video", group: "ugc-reels" };
  }

  return { type: "image", group: "ugc-reels" };
}

async function putWithRetry(
  url: string,
  body: Blob,
  contentType: string,
): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        body,
        headers: { "Content-Type": contentType },
      });

      if (!response.ok) {
        throw new Error(`S3 PUT failed with status ${response.status}`);
      }

      const etag = response.headers.get("ETag");
      if (!etag) {
        throw new Error("S3 response missing ETag header");
      }

      return etag;
    } catch (error) {
      lastError = error as Error;
      if (attempt < MAX_RETRIES - 1) {
        const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Upload a file to S3 using presigned URLs from bulk-start.
 * Handles both single-part and multipart uploads.
 */
export async function uploadFileToS3(
  file: File,
  parts: UploadPart[],
  onProgress: (uploaded: number, total: number) => void,
): Promise<FinishPart[]> {
  // Single-part upload (file < 50 MB)
  if (parts.length === 1) {
    const etag = await putWithRetry(
      parts[0].uploadUrl,
      file,
      file.type,
    );
    onProgress(file.size, file.size);
    return [{ partNumber: 1, etag }];
  }

  // Multipart upload — backend determines part count,
  // we calculate chunk size based on that
  const chunkSize = Math.ceil(file.size / parts.length);
  const finishedParts: FinishPart[] = [];
  let totalUploaded = 0;

  for (const part of parts) {
    const start = (part.partNumber - 1) * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const etag = await putWithRetry(part.uploadUrl, chunk, file.type);

    finishedParts.push({ partNumber: part.partNumber, etag });
    totalUploaded += end - start;
    onProgress(totalUploaded, file.size);
  }

  return finishedParts;
}
