import FallbackView from "@/components/empty-states/FallbackView";

export function MyPostsEmptyState() {
  return (
    <FallbackView
      icon="Image"
      title="No posts yet"
      subtitle="Posts you create will appear here."
      classname="h-[60dvh] justify-center"
    />
  );
}
