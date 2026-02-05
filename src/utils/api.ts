export function getApiBaseUrl(): string {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error('API_BASE_URL is not defined in environment variables');
  }

  return baseUrl;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
