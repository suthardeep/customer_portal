import { Chip } from "@/components/base/chip/Chip";
import { IconButton } from "@/components/base/icon-button/IconButton";
import type { GstProfile } from "../types/types";

interface GstListItemProps {
  profile: GstProfile;
  isSelected: boolean;
  onSelect: (profile: GstProfile) => void;
  onEdit: (profile: GstProfile) => void;
  onDelete: (profile: GstProfile) => void;
}

const GstListItem = ({
  profile,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: GstListItemProps) => {
  return (
    <div
      onClick={() => onSelect(profile)}
      className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
        isSelected
          ? "border-p-500 bg-p-50"
          : "border-n-400 bg-n-50 hover:border-n-500"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-n-900">{profile.businessName}</p>
          {profile.isDefault && <Chip>Default</Chip>}
        </div>
        <p className="mt-0.5 text-sm font-mono text-n-900">{profile.gstin}</p>
        <p className="mt-0.5 text-xs text-n-800 line-clamp-1">
          {profile.billingAddress}
        </p>
      </div>

      <div className="flex flex-col shrink-0 items-center gap-1">
        <IconButton
          icon="Pencil"
          size="sm"
          variant="ghost"
          color="neutral"
          aria-label="Edit GST profile"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(profile);
          }}
        />
        <IconButton
          icon="Trash"
          size="sm"
          variant="ghost"
          color="danger"
          aria-label="Delete GST profile"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(profile);
          }}
        />
      </div>
    </div>
  );
};

export default GstListItem;
