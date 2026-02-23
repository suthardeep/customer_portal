import { Icon } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";

interface CreateCollectionCardProps {
  onClick: () => void;
  className?: string;
}

export function CreateCollectionCard({
  onClick,
  className,
}: CreateCollectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-gray-300 bg-white p-6 group",
        "transition-all hover:border-p-300 hover:bg-p-50/30",
        "aspect-square",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-p-100 group-hover:bg-p-100 transition-colors">
        <Icon name="Add" size="lg" className="text-p-600" />
      </div>
      <p className="font-medium text-gray-700">Create New Collection</p>
    </button>
  );
}
