import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { homepageQueries } from "@/features/homepage/homepageQueries";
import { SectionRenderer } from "@/features/homepage/components/SectionRenderer";
import { HomepageSkeleton } from "@/features/homepage/components/skeletons/HomepageSkeleton";
import FallbackView from "@/components/empty-states/FallbackView";

export const Route = createFileRoute("/_public/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(homepageQueries.config());
  },
  pendingComponent: HomepageSkeleton,
  component: HomePage,
  staticData: { showCategorySubNav: true, showBottomBar: true },
  errorComponent: () => (
    <div className="p-4">
      <FallbackView
        title="Ooopss"
        color="danger"
        icon="AlertCircle"
        subtitle={"We are facing some issues. Please try again later."}
      />
      ,
    </div>
  ),
});

function HomePage() {
  const { data: homeScreen } = useSuspenseQuery(homepageQueries.config());
  console.log(homeScreen, "homeScreen");

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
