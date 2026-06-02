import { Image } from "@/components/base/Image";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { CreatorStoreProductCard } from "@/features/spotlight/components/CreatorStoreProductCard";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useCanGoBack } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/spotlight/users/$userId_/store")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      spotlightQueries.creatorStore(params.userId),
    );
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=1800',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();

  const { data } = useSuspenseQuery(spotlightQueries.creatorStore(userId));

  const { creator, products } = data;
  const canGoBack = useCanGoBack();

  const stats = [
    { value: creator.postCount, label: "Posts" },
    { value: creator.followerCount, label: "Followers" },
  ];

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Profile header */}
      <div className="rounded-2xl overflow-hidden border border-n-300">
        {/* Banner */}
        <div className="relative h-36 bg-n-200">
          {creator.bannerImageUrl && (
            <Image
              src={creator.bannerImageUrl}
              alt="Banner"
              className="size-full object-cover"
            />
          )}
          <div className="absolute inset-x-3 top-3 flex justify-between">
            {canGoBack && (
              <IconButton
                aria-label="Go back"
                icon="ChevronLeft"
                size="lg"
                color="neutral"
                className="bg-white hover:bg-p-100"
                onClick={() => history.back()}
              />
            )}
            <IconButton
              aria-label="Share creator store"
              icon="Share"
              size="lg"
              className="bg-white hover:bg-p-100"
              color="neutral"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Avatar + info */}
        <div className="px-4 pb-4">
          <div className="flex justify-center -mt-10">
            <div className="size-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-n-100">
              <Image
                src={creator.profileImageUrl}
                alt={creator.name}
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="mt-2 space-y-1.5 text-center">
            <h5 className="font-semibold text-n-900">{creator.name}</h5>
            {creator.bio && (
              <p className="text-n-800 line-clamp-2">{creator.bio}</p>
            )}
            <div className="flex justify-center gap-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1 rounded-full bg-p-50 px-3 py-1"
                >
                  <span className="font-bold text-n-900">{stat.value}</span>
                  <span className="font-medium text-n-800">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="font-medium text-n-900">No products yet</p>
          <p className="text-n-700">This creator hasn't added any products to their store.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <CreatorStoreProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
