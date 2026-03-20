/** Backend media type (lowercase for media endpoints) */
export type MediaType = "video" | "image";

// ── bulk-start ──────────────────────────────────────────────

export interface BulkStartFile {
  fileName: string;
  contentType: string;
  fileSize: number;
  group: string;
  type: MediaType;
}

export interface BulkStartRequest {
  files: BulkStartFile[];
}

export interface UploadPart {
  partNumber: number;
  uploadUrl: string;
}

export interface UploadEntry {
  index: number;
  key: string;
  uploadId: string;
  parts: UploadPart[];
}

export interface BulkStartResponse {
  uploads: UploadEntry[];
}

// ── bulk-finish ─────────────────────────────────────────────

export interface FinishPart {
  partNumber: number;
  etag: string;
}

export interface BulkFinishFile {
  key: string;
  uploadId: string;
  parts: FinishPart[];
  fileName: string;
  contentType: string;
  fileSize: number;
  type: MediaType;
  group: string;
  uploaderType: "customer";
  platformType: "customer";
}

export interface BulkFinishRequest {
  files: BulkFinishFile[];
}

export interface MediaFileResult {
  mediaFileId: string;
  s3Url: string;
  type: MediaType;
  processingStatus: "QUEUED" | "PROCESSING" | "DONE" | "FAILED";
}

export interface BulkFinishResponse {
  results: MediaFileResult[];
}

// ── progress tracking ───────────────────────────────────────

export type UploadPhase =
  | "preparing"
  | "uploading"
  | "finalizing"
  | "done"
  | "error";

export interface UploadProgress {
  phase: UploadPhase;
  /** 0–100 overall percentage */
  percent: number;
}
