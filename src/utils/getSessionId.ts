import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookies, setCookie } from "@tanstack/react-start/server";

/**
 * Isomorphic utility to get (or create) a persistent guest session ID.
 *
 * - **Server**: Reads `session_id` from cookies. If absent, generates a UUID,
 *   sets it as a non-httpOnly cookie (so client can read it too), and returns it.
 * - **Client**: Reads `session_id` from `document.cookie`. If absent, generates
 *   a UUID, writes it to `document.cookie`, and returns it.
 *
 * The session ID is never removed — it persists for 1 year and is used to
 * identify guest carts across sessions.
 *
 * @returns The guest session ID string
 */
export const getSessionId = createIsomorphicFn()
  .server(() => {
    const { session_id } = getCookies();
    if (session_id) return session_id;

    const newId = crypto.randomUUID();
    setCookie("session_id", newId, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return newId;
  })
  .client(() => {
    const match = document.cookie.match(/session_id=([^;]+)/);
    if (match) return match[1];

    const newId = crypto.randomUUID();
    document.cookie = `session_id=${newId}; path=/; max-age=${60 * 60 * 24 * 365}`;
    return newId;
  });
