import { Image } from "@/components/base/Image";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import type { FeedPost } from "@/features/spotlight/types/feed.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { prefetchUpcomingPosts } from "../utils/prefetchShorts";
import { ShortFeedScrollerItem } from "./ShortFeedScrollerItem";

const PRELOAD_AHEAD = 5;
const PRELOAD_BEHIND = 5;
const LOAD_MORE_THRESHOLD = 3;

interface ShortFeedScrollerProps {
  initialPostId: string;
}

export function ShortFeedScroller({ initialPostId }: ShortFeedScrollerProps) {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    spotlightQueries.feedExplore(),
  );

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data],
  );

  const initialIndexRef = useRef<number | null>(null);
  const resolvedInitialIndex = useMemo(() => {
    if (initialIndexRef.current !== null) return initialIndexRef.current;
    if (posts.length === 0) return null;
    const idx = posts.findIndex((p) => p.id === initialPostId);
    // If the deep-linked post isn't in page 1, fall back to index 0 rather than
    // leaving the container permanently hidden (blank screen on refresh).
    const resolved = idx === -1 ? 0 : idx;
    initialIndexRef.current = resolved;
    return resolved;
  }, [posts, initialPostId]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const didInitialScroll = useRef(false);
  const observerReadyRef = useRef(false);

  // Stable refs so the IntersectionObserver callback never needs to be recreated
  // when paginated data grows — avoids a brief observer gap during rapid scroll.
  const postsRef = useRef<FeedPost[]>([]);
  const hasNextPageRef = useRef(hasNextPage);
  const fetchNextPageRef = useRef(fetchNextPage);
  useEffect(() => { postsRef.current = posts; }, [posts]);
  useEffect(() => { hasNextPageRef.current = hasNextPage; }, [hasNextPage]);
  useEffect(() => { fetchNextPageRef.current = fetchNextPage; }, [fetchNextPage]);

  // Initial scroll — runs once when resolved index and DOM element are ready
  useEffect(() => {
    if (didInitialScroll.current) return;
    if (resolvedInitialIndex === null) return;
    const targetPost = posts[resolvedInitialIndex];
    if (!targetPost) return;
    const el = itemRefs.current.get(targetPost.id);
    if (!el) return;
    setActiveIndex(resolvedInitialIndex);
    el.scrollIntoView({ behavior: "instant" });
    didInitialScroll.current = true;
    requestAnimationFrame(() => {
      observerReadyRef.current = true;
      setReady(true);
    });
  }, [posts, resolvedInitialIndex]);

  // Observer — created once after initial scroll; reads mutable refs so it never
  // needs to be torn down when new pages load (avoids missed events during rapid scroll).
  useEffect(() => {
    if (
      !observerReadyRef.current ||
      posts.length === 0 ||
      !containerRef.current
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting entry to avoid double-fires during scroll
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (!best) return;

        const postId = (best.target as HTMLDivElement).dataset.postId;
        if (!postId) return;
        const currentPosts = postsRef.current;
        const index = currentPosts.findIndex((p) => p.id === postId);
        if (index === -1) return;

        setActiveIndex((prev) => (prev === index ? prev : index));
        router.navigate({
          to: "/spotlight/shorts/$id",
          params: { id: postId },
          replace: true,
        });
        prefetchUpcomingPosts(currentPosts, index);
        if (hasNextPageRef.current && index >= currentPosts.length - LOAD_MORE_THRESHOLD) {
          fetchNextPageRef.current();
        }
      },
      { root: containerRef.current, threshold: 0.6 },
    );
    for (const el of itemRefs.current.values()) {
      observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-scroll overflow-x-hidden touch-pan-y snap-y p-0! snap-mandatory overscroll-y-contain no-scrollbar h-dvh lg:h-[calc(100dvh-180px)] will-change-transform"
      style={ready ? undefined : { visibility: "hidden" }}
    >
      {posts.map((post: FeedPost, index: number) => {
        const isActive = activeIndex !== null && index === activeIndex;
        const isPreload =
          activeIndex !== null &&
          index > activeIndex &&
          index <= activeIndex + PRELOAD_AHEAD;
        const isAlive =
          isActive ||
          isPreload ||
          (activeIndex !== null && index >= activeIndex - PRELOAD_BEHIND);

        return (
          <div
            key={post.id}
            ref={(el) => {
              if (el) itemRefs.current.set(post.id, el);
              else itemRefs.current.delete(post.id);
            }}
            data-post-id={post.id}
            className="snap-start snap-always h-dvh lg:h-[calc(100dvh-180px)] w-full max-w-full shrink-0 overflow-hidden"
          >
            {isAlive ? (
              <ShortFeedScrollerItem
                post={post}
                isActive={isActive}
                isPreload={isPreload}
              />
            ) : (
              <Image
                src={post.media.thumbnail}
                alt={post.caption}
                className="size-full object-cover lg:rounded-xl"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
