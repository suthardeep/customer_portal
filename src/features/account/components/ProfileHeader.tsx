import { IconButton } from "@/components/base/icon-button/IconButton";
import { cn } from "@/utils/cssHelpers";
import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";
import { getInitials } from "@/utils/stringHelpers";
import { Suspense } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";
import { SubscriptionType } from "../subscription/types/enums";

function ProfileHeaderContent() {
  const editDialog = useToggle();

  const { user, isAuthenticated } = useAuth();
  const isVerified = user?.phoneVerified || user?.emailVerified || false;
  const displayName = user?.fullName || "User";
  const initials = getInitials(displayName);
  const hasSubscription =
    user?.subscriptionType === SubscriptionType.PREMIUM || false;

  return (
    <div className="flex items-center gap-3 border-b border-n-200">
      {/* Avatar with gradient border */}
      <div className="relative">
        <div
          className={cn(
            "size-16 rounded-full p-0.75",
            hasSubscription && "bg-linear-to-br from-s-500 to-p-500",
          )}
        >
          {isAuthenticated && user?.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt={"my-profile-image"}
              className="rounded-full object-cover size-full"
            />
          ) : (
            <div className="flex size-full items-center justify-center rounded-full bg-p-100 text-lg font-semibold text-p-700">
              {initials}
            </div>
          )}
        </div>

        {isVerified && (
          <div className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full bg-success-500">
            <Icon name="CheckCircle" className="text-white" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* User info */}
      <div className="flex-1 space-y-0.5">
        <h6 className="font-semibold text-n-900">{displayName}</h6>
        <p className="font-medium text-n-800">{user?.phone}</p>
      </div>

      {/* Edit button */}
      <IconButton
        icon="Pencil"
        variant="ghost"
        color="neutral"
        aria-label="Edit profile"
        onClick={editDialog.open}
      />

      <EditProfileDialog
        isOpen={editDialog.isOpen}
        onClose={editDialog.close}
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
