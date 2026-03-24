import FallbackView from "@/components/empty-states/FallbackView";

export function BookmarksEmptyState() {
  return (
    <FallbackView
      icon="Bookmark"
      title="No bookmarks yet"
      subtitle="Posts you bookmark will appear here."
      classname="h-[60dvh] justify-center"
    />
  );
}
