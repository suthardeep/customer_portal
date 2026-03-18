import { Icon } from "@/components/base/icon/Icon";
import { Image } from "@/components/base/Image";
import type { SpotlightProfile } from "../types/types";

interface SpotlightProfileHeaderProps {
  profile: Pick<SpotlightProfile, "name" | "email" | "profileImageUrl" | "isActive">;
}

export function SpotlightProfileHeader({ profile }: SpotlightProfileHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar with gradient ring */}
      <div className="relative">
        <div className="size-16 rounded-full bg-linear-to-br from-p-300 via-p-400 to-s-400 p-0.5">
          <div className="size-full overflow-hidden rounded-full bg-white p-0.5">
            <Image
              src={profile.profileImageUrl}
              alt="profile"
              className="size-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Verification badge */}
        {profile.isActive && (
          <div className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full bg-success-500">
            <Icon name="CheckCircle" className="text-white" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* User info */}
      <div className="space-y-0.5">
        <h6 className="font-semibold text-n-900">{profile.name}</h6>
        <p className="font-medium text-n-800">{profile.email}</p>
      </div>
    </div>
  );
}
