import { Button } from "@/components/base/button/Button";
import { IconButton } from "@/components/base/icon-button/IconButton";
import Spinner from "@/components/compound/spinner/Spinner";
import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types";
import { DeleteCollectionDialog } from "@/features/wishlist/components/DeleteCollectionDialog";
import { EditCollectionDialog } from "@/features/wishlist/components/EditCollectionDialog";
import CollectionDetailSkeleton from "@/features/wishlist/components/skeletons/CollectionDetailSkeleton";
import { wishlistQueries } from "@/features/wishlist/wishlistQueries";
import { useToggle } from "@/hooks/useToggle";
import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export const Route = createFileRoute(
  "/_protected/account/wishlist/$collectionId",
)({
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        wishlistQueries.collectionsDetails(params.collectionId),
      ),
      context.queryClient.ensureInfiniteQueryData(
        wishlistQueries.collectionProductsInfinite(params.collectionId),
      ),
    ]);
  },
  pendingComponent: CollectionDetailSkeleton,
  component: CollectionDetailComponent,
});

function CollectionDetailComponent() {
  const { collectionId } = Route.useParams();
  const navigate = useNavigate();
  const editDialog = useToggle();
  const deleteDialog = useToggle();

  const { data: collection } = useSuspenseQuery(
    wishlistQueries.collectionsDetails(collectionId),
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(wishlistQueries.collectionProductsInfinite(collectionId));

  // Intersection Observer for infinite scroll
  const [loadMoreRef, entry] = useIntersectionObserver({ threshold: 0.5 });

  if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  // Flatten pages into single array
  const products = data?.pages.flatMap((page) => page.data) ?? [];

  const hasProducts = (collection?.itemCount ?? 0) > 0;

  if (isLoading) {
    return <CollectionDetailSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <AccountPageHeader
          title={collection?.name ?? "Collection"}
          className="mb-0"
        />

        {collection && (
          <div className="flex gap-1">
            <IconButton
              icon="Edit"
              variant="ghost"
              size="sm"
              color="neutral"
              onClick={editDialog.open}
              aria-label="Edit collection"
            />
            <IconButton
              icon="Trash"
              variant="ghost"
              color="neutral"
              size="sm"
              onClick={deleteDialog.open}
              aria-label="Delete collection"
            />
          </div>
        )}
      </div>

      {hasProducts && products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => {
              if (!product?.name) return;
              return (
                <Link
                  to="/product/$productId"
                  params={{ productId: product?.productId }}
                  key={product?.id}
                >
                  <ProductCard
                    product={product as unknown as Product}
                    disableDetailPageRedirection
                  />
                </Link>
              );
            })}
          </div>

          {/* Loading indicator at bottom */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isFetchingNextPage && <Spinner />}
            </div>
          )}
        </>
      ) : (
        <FallbackView
          title="No products in this collection"
          icon="ShoppingCart"
          version="default"
          footer={
            <Link to="/">
              <Button variant="filled">Browse Products</Button>
            </Link>
          }
        />
      )}

      {collection && (
        <>
          <EditCollectionDialog
            collection={collection}
            isOpen={editDialog.isOpen}
            onClose={editDialog.close}
          />

          <DeleteCollectionDialog
            collection={collection}
            isOpen={deleteDialog.isOpen}
            onClose={deleteDialog.close}
            onSuccess={() => navigate({ to: "/account/wishlist" })}
          />
        </>
      )}
    </div>
  );
}
