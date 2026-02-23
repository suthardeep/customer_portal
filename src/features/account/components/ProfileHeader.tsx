import { useSuspenseQuery } from "@tanstack/react-query";
import { Icon } from "@/components/base/icon/Icon";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { authQueries } from "@/features/auth/authQueries";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";
import { Suspense } from "react";
import { getInitials } from "@/utils/stringHelpers";

function ProfileHeaderContent() {
  const { data: user } = useSuspenseQuery(authQueries.profile());

  const isVerified = user.phoneVerified || user.emailVerified;
  const displayName = user.fullName || "User";
  const initials = getInitials(displayName);

  return (
    <div className="flex items-center gap-3 border-b border-n-200">
      {/* Avatar with gradient border */}
      <div className="relative">
        <div className="size-16 rounded-full bg-linear-to-br from-s-500 to-p-500 p-0.5">
          <div className="flex size-full items-center justify-center rounded-full bg-p-100 text-lg font-semibold text-p-700">
            {initials}
          </div>
        </div>

        {/* Verification badge */}
        {isVerified && (
          <div className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full bg-success-500">
            <Icon name="CheckCircle" className="text-white" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* User info */}
      <div className="flex-1 space-y-0.5">
        <h6 className="font-semibold text-n-900">{displayName}</h6>
        <p className="font-medium text-n-800">{user.phone}</p>
      </div>

      {/* Edit button */}
      <IconButton
        icon="Pencil"
        variant="ghost"
        color="neutral"
        aria-label="Edit profile"
      />
    </div>
  );
}

export function ProfileHeader() {
  return (
    <Suspense fallback={<ProfileHeaderSkeleton />}>
      <ProfileHeaderContent />
    </Suspense>
  );
}
