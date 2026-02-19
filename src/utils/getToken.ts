import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookies } from "@tanstack/react-start/server";

/**
 * Isomorphic utility to get the access token
 *
 * - **Server**: Retrieves from httpOnly cookies via getCookies()
 * - **Client**: Returns undefined (httpOnly cookies not accessible from client)
 *
 * @returns The access token if available, otherwise undefined
 */
export const getToken = createIsomorphicFn()
  .server(() => {
    // Server: Get from httpOnly cookies
    const { access_token } = getCookies();
    return access_token;
  })
  .client(() => {
    // Client: httpOnly cookies are not accessible from client-side JavaScript
    // This prevents runtime errors when called from client components
    return undefined;
  });
