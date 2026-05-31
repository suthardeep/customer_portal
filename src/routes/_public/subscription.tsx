import { IconButton } from "@/components/base/icon-button/IconButton";
import { Icon } from "@/components/base/icon/Icon";
import SpotlightTierBadge from "@/components/compound/illustrations/SpotlightTierBadge";
import { ActiveSubscriptionView } from "@/features/account/subscription/components/ActiveSubscriptionView";
import { SubscriptionErrorComponent } from "@/features/account/subscription/components/SubscriptionErrorComponent";
import { SubscriptionFeatureGrid } from "@/features/account/subscription/components/SubscriptionFeatureGrid";
import { SubscriptionFooterLinks } from "@/features/account/subscription/components/SubscriptionFooterLinks";
import { SubscriptionPlanSelector } from "@/features/account/subscription/components/SubscriptionPlanSelector";
import { SubscriptionSunburst } from "@/features/account/subscription/components/SubscriptionSunburst";
import { subscriptionQueries } from "@/features/account/subscription/subscriptionQueries";
import SubscriptionSkeleton from "@/features/account/subscription/components/skeletons/SubscriptionSkeleton";
import { APP_NAME, APP_URL, buildMeta } from "@/utils/seo";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/subscription")({
  head: () => ({
    meta: buildMeta({
      title: `${APP_NAME} Premium — Unlock Exclusive Benefits`,
      description: `Upgrade to ${APP_NAME} Premium for exclusive deals, early access, and members-only benefits.`,
      url: `${APP_URL}/subscription`,
    }),
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(subscriptionQueries.plans()),
      context.queryClient.prefetchQuery(subscriptionQueries.current()),
    ]);
  },
  pendingComponent: SubscriptionSkeleton,
  component: SubscriptionPage,
  errorComponent: SubscriptionErrorComponent,
  staticData: {
    maxWidth: "none",
    hideHeader: "all",
  },
});

function SubscriptionPage() {
  const router = useRouter();
  const { data: plans } = useSuspenseQuery(subscriptionQueries.plans());
  const { data: currentSubscription } = useSuspenseQuery(
    subscriptionQueries.current(),
  );
  const hasActivePlan = currentSubscription?.isPremiumActive;

  return (
    <div className="relative min-h-screen bg-s-1000 overflow-hidden">
      {/* Sunburst rays layer */}
      <SubscriptionSunburst />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <IconButton
          icon="ChevronLeft"
          variant="ghost"
          color="neutral"
          className="hover:bg-s-900"
          iconClassName="group-hover:text-n-50"
          onClick={() => router.history.back()}
          aria-label="Go back"
        />
      </div>

      {/* Page content */}
      <div className="relative z-1 flex flex-col items-center px-5 pb-10 pt-18 mx-auto md:max-w-xl lg:max-w-2xl">
        {/* Badge + floating stars */}
        <div className="relative flex items-center justify-center w-52 h-56">
          {/* Small star — top-left */}
          <div
            className="absolute top-3 left-3"
            style={{
              animation: "starFloat1 4s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          >
            <Icon
              name="Star"
              size="sm"
              className="text-yellow-400 **:fill-(--accent-star) **:stroke-none"
            />
          </div>
          {/* Large star — top-right (biggest) */}
          <div
            className="absolute -top-2 right-2"
            style={{ animation: "starFloat2 5s ease-in-out infinite" }}
          >
            <Icon
              name="Star"
              size="lg"
              className="text-yellow-400 **:fill-(--accent-star) **:stroke-none size-10"
            />
          </div>
          {/* Tiny star — mid-left */}
          <div
            className="absolute top-14 -left-1"
            style={{
              animation: "starFloat3 3.5s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <Icon
              name="Star"
              size="xs"
              className="text-yellow-400 **:fill-(--accent-star) **:stroke-none"
            />
          </div>

          {/* Badge scaled up */}
          <div
            style={{
              transform: "scale(2.5)",
              transformOrigin: "center center",
            }}
          >
            <SpotlightTierBadge />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mt-8 mb-8 space-y-3">
          {hasActivePlan ? (
            <>
              <h2 className="font-bold text-n-50">You're on Prime</h2>
              <p className="text-n-700 px-2">Manage your subscription below.</p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-n-50">Upgrade to premium</h2>
              <p className="text-n-700 px-2">
                Get exclusive deals, early access,
                <br />
                and members-only benefits.
              </p>
            </>
          )}
        </div>

        {/* Features */}
        <SubscriptionFeatureGrid />

        {/* Active plan or plan selector */}
        <div className="w-full mt-8">
          {hasActivePlan && currentSubscription ? (
            <ActiveSubscriptionView
              subscription={currentSubscription}
              plans={plans}
            />
          ) : (
            <SubscriptionPlanSelector plans={plans} />
          )}
        </div>

        {/* Footer links */}
        <div className="mt-8">
          <SubscriptionFooterLinks />
        </div>
      </div>
    </div>
  );
}
