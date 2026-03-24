import { useEffect, useRef } from "react";
import { UgcPostType } from "../../types/enums";
import type { FeedPost } from "../../types/feed.types";
import { recordPostView } from "../../spotlightService";

const VIEW_THRESHOLD_MS: Record<UgcPostType, number> = {
  [UgcPostType.VIDEO]: 3000,
  [UgcPostType.IMAGE]: 5000,
};

/**
 * Tracks engagement time for the active post and fires a view event when the
 * threshold is met.
 *
 * - For VIDEO: timer only ticks while the video is actually playing (not buffering).
 *   Listens to `playing` / `waiting` / `pause` events on the video element.
 * - For IMAGE: timer starts immediately when the post becomes active.
 * - Pauses when the browser tab is hidden; resumes on visibility restore.
 * - Each postId is tracked in a session-scoped Set — will never fire twice.
 */

const viewedSet = new Set<string>();

export function useShortsEngagement(
  activePost: FeedPost | null,
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isMediaReady: boolean,
) {
  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const tickingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    elapsedRef.current = 0;
    lastTickRef.current = null;
    tickingRef.current = false;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!activePost) return;

    const postId = activePost.id;
    const threshold = VIEW_THRESHOLD_MS[activePost.type];

    if (viewedSet.has(postId)) return;

    function tick(now: number) {
      if (!tickingRef.current) return;
      if (lastTickRef.current !== null) {
        elapsedRef.current += now - lastTickRef.current;
      }
      lastTickRef.current = now;

      if (elapsedRef.current >= threshold) {
        viewedSet.add(postId);
        recordPostView({ data: postId }).catch(() => {
          // fire-and-forget — don't surface errors to the user
        });
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    function startTicking() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      lastTickRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }

    function stopTicking() {
      tickingRef.current = false;
      lastTickRef.current = null;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    function handleVisibility() {
      if (document.hidden) {
        stopTicking();
      } else {
        // Resume only if the video is still playing (for video posts)
        const video = videoRef.current;
        if (activePost!.type === UgcPostType.IMAGE) {
          if (isMediaReady) startTicking();
        } else if (video && !video.paused) {
          startTicking();
        }
      }
    }

    if (activePost.type === UgcPostType.IMAGE) {
      if (!document.hidden && isMediaReady) startTicking();
    } else {
      // VIDEO: wait for actual playback
      const video = videoRef.current;
      if (video) {
        if (!video.paused && !document.hidden) startTicking();
        video.addEventListener("playing", startTicking);
        video.addEventListener("waiting", stopTicking);
        video.addEventListener("pause", stopTicking);
        video.addEventListener("emptied", stopTicking);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopTicking();
      document.removeEventListener("visibilitychange", handleVisibility);
      const video = videoRef.current;
      if (video) {
        video.removeEventListener("playing", startTicking);
        video.removeEventListener("waiting", stopTicking);
        video.removeEventListener("pause", stopTicking);
        video.removeEventListener("emptied", stopTicking);
      }
    };
    // Re-run when the active post changes or media becomes ready. videoRef is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePost?.id, activePost?.type, isMediaReady]);
}
