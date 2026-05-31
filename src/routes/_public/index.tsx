import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { homepageQueries } from "@/features/homepage/homepageQueries";
import { SectionRenderer } from "@/features/homepage/components/SectionRenderer";
import { HomepageSkeleton } from "@/features/homepage/components/skeletons/HomepageSkeleton";
import FallbackView from "@/components/empty-states/FallbackView";
import { buildMeta, APP_NAME, APP_DESCRIPTION, APP_URL } from "@/utils/seo";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: buildMeta({
      title: `${APP_NAME} — Shop Online`,
      description: APP_DESCRIPTION,
      url: APP_URL,
    }),
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(homepageQueries.config());
  },
  pendingComponent: HomepageSkeleton,
  component: HomePage,
  staticData: { showCategorySubNav: true, showBottomBar: true, maxWidth: "none" },
  errorComponent: () => (
    <div className="p-4">
      <FallbackView
        title="Ooopss"
        color="danger"
        icon="AlertCircle"
        subtitle={"We are facing some issues. Please try again later."}
      />
    </div>
  ),
});

function HomePage() {
  const { data: homeScreen } = useSuspenseQuery(homepageQueries.config());
  return (
    <div className="flex flex-col">
      {homeScreen.sections
        .filter((section) => section.active)
        .map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
    </div>
  );
}
