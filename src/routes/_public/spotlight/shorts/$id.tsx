import {
  createFileRoute,
  Link,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { SpotlightTaggedProductsStack } from "@/features/spotlight/components/SpotlightTaggedProductsStack";
import ShortActions from "@/features/spotlight/shorts/components/actions/ShortActions";
import { ShortPlayer } from "@/features/spotlight/shorts/components/ShortPlayer";

export const Route = createFileRoute("/_public/spotlight/shorts/$id")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      spotlightQueries.postDetail(params.id),
    );
  },
  component: RouteComponent,
  staticData: {
    hideHeader: "mobile",
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: post } = useSuspenseQuery(spotlightQueries.postDetail(id));
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div className="p-0 lg:p-6 grid lg:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
      <div className="hidden xl:flex flex-col justify-between h-full">
        {canGoBack && (
          <div
            className="flex w-fit items-center gap-1 hover:bg-n-300 p-1 rounded-lg cursor-pointer"
            onClick={() => router.history.back()}
          >
            <Icon
              name={"ChevronLeft"}
              aria-label="go-back"
              className="mt-0.5"
            />
            <span className="text-n-900">Back</span>
          </div>
        )}
        <SpotlightTaggedProductsStack products={post.taggedProducts} />
      </div>

      <div className="aspect-9/16 min-h-dvh lg:min-h-auto lg:max-h-[80vh] w-full h-full relative">
        <ShortPlayer type={post.type} media={post.media} title={post.caption} />
        <ShortActions
          stats={post.stats}
          isBookmarked={post.isBookmarked}
          isLiked={post.isLiked}
          postId={post.id}
          className="flex lg:hidden mb-20 mr-4"
        />
      </div>
      <div className="flex-col justify-between h-full items-start hidden lg:flex">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10">
            <Image
              src={post.creator.profileImage}
              alt={"profile-img-" + post.creator.profileImage}
              className="size-10 rounded-full"
            />
          </div>
          <div>
            <Link
              to="/spotlight/users/$userId"
              params={{ userId: post.creator.id }}
              className="text-n-900 font-medium hover:underline"
            >
              {" "}
              {post.creator.fullName}{" "}
            </Link>
            <p className="text-n-800">{post.caption}</p>
          </div>
        </div>
        <ShortActions
          stats={post.stats}
          isBookmarked={post.isBookmarked}
          isLiked={post.isLiked}
          postId={post.id}
          className="hidden lg:flex ml-8 my-auto"
        />
      </div>
    </div>
  );
}
