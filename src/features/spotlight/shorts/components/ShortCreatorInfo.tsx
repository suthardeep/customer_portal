import { Link } from "@tanstack/react-router";
import { Image } from "@/components/base/Image";
import type { FeedPost } from "@/features/spotlight/types/feed.types";

interface ShortCreatorInfoProps extends Pick<FeedPost, "creator" | "caption"> {}

export function ShortCreatorInfo({ creator, caption }: ShortCreatorInfoProps) {
  return (
    <div className="flex items-center gap-3 mb-4 w-full">
      <Link
        to="/spotlight/users/$userId"
        params={{ userId: creator.id }}
        className="size-10"
      >
        <Image
          src={creator.profileImage}
          alt={"profile-img-" + creator.id}
          className="h-full w-full rounded-full"
        />
      </Link>
      <div>
        <Link
          to="/spotlight/users/$userId"
          params={{ userId: creator.id }}
          className="text-n-900 font-medium hover:underline"
        >
          {creator.fullName}
        </Link>
        <p className="text-n-800 truncate">{caption}</p>
      </div>
    </div>
  );
}
