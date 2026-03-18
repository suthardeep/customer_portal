import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { spotlightQueries } from "@/features/spotlight/spotlightQueries";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { SpotlightTaggedProductsStack } from "@/features/spotlight/components/SpotlightTaggedProductsStack";
import ShortActions from "@/features/spotlight/shorts/components/actions/ShortActions";

export const Route = createFileRoute("/_public/spotlight/shorts/$id")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      spotlightQueries.postDetail(params.id),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: post } = useSuspenseQuery(spotlightQueries.postDetail(id));
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      <div>
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
      </div>

      <div className="aspect-9/16 max-h-[80vh] relative">
        <video
          src={post.media.playUrl}
          poster={post.media.thumbnail}
          controls={false}
          className="size-full rounded-xl"
        />
        <ShortActions
          stats={post.stats}
          isBookmarked={post.isBookmarked}
          isLiked={post.isLiked}
          postId={post.id}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-3">
          <div className="size-10">
            <Image
              src={post.creator.profileImage}
              alt={"profile-img-" + post.creator.profileImage}
              className="size-10 rounded-full"
            />
          </div>
          <div>
            <p className="text-n-900 font-medium"> {post.creator.fullName} </p>
            <p className="text-n-800">{post.caption}</p>
          </div>
        </div>
        <SpotlightTaggedProductsStack products={post.taggedProducts} />
      </div>
    </div>
  );
}
