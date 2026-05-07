import { getApiBaseUrl, ApiError } from "@/utils/api";
import { objectToSearchParams } from "@/utils/apiHelpers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions {
  /** HTTP method for the request. Defaults to "GET" */
  method?: HttpMethod;
  /** Query parameters to append to the URL */
  params?: Record<string, any>;
  /** Request body (will be JSON stringified) */
  body?: unknown;
  /** Additional headers to merge with default headers */
  headers?: Record<string, string>;
  /** Optional auth token. If provided, adds "Authorization: Bearer {token}" header */
  token?: string;
}

/**
 * Centralized API request utility with consistent error handling and auth support
 *
 * @template T - Expected response type
 * @param endpoint - API endpoint path (e.g., "/v1/products/list")
 * @param options - Request configuration options
 * @returns Promise resolving to the typed response
 *
 * @example
 * ```typescript
 * // Public endpoint
 * const products = await apiRequest<ProductListResponse>("/v1/products/public/list", {
 *   method: "GET",
 *   params: { page: 1, limit: 20 }
 * });
 *
 * // Protected endpoint with auth
 * const token = await getToken();
 * const category = await apiRequest<CategoryResponse>("/v1/categories/123", {
 *   method: "GET",
 *   token
 * });
 *
 * // POST with body
 * await apiRequest<OtpResponse>("/v1/auth/send-otp", {
 *   method: "POST",
 *   body: { phoneNumber: "+1234567890" }
 * });
 * ```
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<T> {
  const { method = "GET", params, body, headers = {}, token } = options ?? {};

  const baseUrl = getApiBaseUrl();
  const queryString = params ? objectToSearchParams(params) : "";
  const url = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;

  // Build headers
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Add auth header if token provided
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  // console.log(`[API Request] ${method} ${url}`, {
  //   headers: requestHeaders,
  //   body: body ?? null,
  // });

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    // Attempt to parse error response body
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(errorData.message);
    // throw new ApiError(
    //   `${errorData.message || response.statusText} [${method} ${endpoint}]`,
    //   response.status,
    //   errorData,
    // );
  }

  const text = await response.text();
  return text ? JSON.parse(text) : (null as T);
}
