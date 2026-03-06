import { createIsomorphicFn } from "@tanstack/react-start";

export const getApiBaseUrl = createIsomorphicFn()
  .server(() => {
    const baseUrl = process.env.API_BASE_URL;
    if (!baseUrl) throw new Error("API_BASE_URL is not defined in environment variables");
    return baseUrl;
  })
  .client(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!baseUrl) throw new Error("VITE_API_BASE_URL is not defined in environment variables");
    return baseUrl;
  });

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown,
  ) {
    super(statusCode ? `${message} [${statusCode}]` : message);
    this.name = 'ApiError';
  }
}
