import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { CollectionCard } from "@/features/wishlist/components/CollectionCard";
import { CreateCollectionCard } from "@/features/wishlist/components/CreateCollectionCard";
import { CreateCollectionDialog } from "@/features/wishlist/components/CreateCollectionDialog";
import { CollectionListSkeleton } from "@/features/wishlist/components/skeletons/CollectionListSkeleton";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { useToggle } from "@/hooks/useToggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account/wishlist/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(wishlistQueries.collections());
  },
  pendingComponent: CollectionListSkeleton,
  component: WishlistCollectionsComponent,
  errorComponent: () => (
    <FallbackView
      title="Failed to load your wishlists"
      icon="Heart"
      subtitle="We couldn't load your wishlist."
      color="danger"
    />
  ),
});

function WishlistCollectionsComponent() {
  const createDialog = useToggle();
  const { data } = useSuspenseQuery(wishlistQueries.collections());

  const collections = data.data;
  const hasCollections = data?.meta?.totalRows > 0;

  return (
    <AccountPageWrapper className="space-y-6">
      <AccountPageHeader title="My Wishlist" />

      {hasCollections ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Create New Collection Card (First) */}
          <CreateCollectionCard onClick={createDialog.open} />
          {/* Collection Cards */}
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <FallbackView
          title="No wishlist collections yet"
          icon="FolderOpen"
          version="default"
          footer={<CreateCollectionCard onClick={createDialog.open} />}
        />
      )}

      <CreateCollectionDialog
        isOpen={createDialog.isOpen}
        onClose={createDialog.close}
      />
    </AccountPageWrapper>
  );
}
