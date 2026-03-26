/**
 * Extracts an HTTP status code from an Error message.
 * Supports formats like:
 *   "[401] Invalid or expired token"
 *   "[403] Forbidden"
 *
 * Returns undefined if no status is found.
 */
export function getErrorStatusCode(error: unknown): number | undefined {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  if (!("message" in error) || typeof (error as any).message !== "string") {
    return undefined;
  }

  const message = (error as any).message;

  const match = message.match(/\[(\d{3})\]/);
  if (!match) {
    return undefined;
  }

  const status = Number(match[1]);
  return Number.isFinite(status) ? status : undefined;
}
