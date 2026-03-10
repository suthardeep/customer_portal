import { IconButton } from "@/components/base/icon-button/IconButton";
import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";
import { getInitials } from "@/utils/stringHelpers";
import { Suspense } from "react";
import EditProfileDialog from "./EditProfileDialog";
import { ProfileHeaderSkeleton } from "./ProfileHeaderSkeleton";

function ProfileHeaderContent() {
  const editDialog = useToggle();

  const { user, isAuthenticated } = useAuth();
  const isVerified = user?.phoneVerified || user?.emailVerified || false;
  const displayName = user?.fullName || "User";
  const initials = getInitials(displayName);

  return (
    <div className="flex items-center gap-3 border-b border-n-200">
      {/* Avatar with gradient border */}
      {isAuthenticated && user?.profileImageUrl ? (
        <div className="size-16">
          <Image
            src={user.profileImageUrl}
            alt={"my-profile-image"}
            className="rounded-full object-cover shrink-0 border border-n-500"
          />
        </div>
      ) : (
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
      )}

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
