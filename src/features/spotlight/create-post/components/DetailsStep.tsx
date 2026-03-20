import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/Image";
import { Input } from "@/components/base/input/Input";
import { Textarea } from "@/components/base/textarea/Textarea";
import { formatCurrency } from "@/utils/formatCurrency";
import type { OrderItem } from "@/features/account/my-orders/types/types";
import { MAX_CAPTION_LENGTH, MAX_TAGS } from "../constants";

interface DetailsStepProps {
  products: OrderItem[];
  selectedProductIds: string[];
  files: File[];
  previews: string[];
  caption: string;
  onCaptionChange: (value: string) => void;
  tagInput: string;
  onTagInputChange: (value: string) => void;
  tags: string[];
  onRemoveTag: (tag: string) => void;
  onTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DetailsStep = ({
  products,
  selectedProductIds,
  files,
  previews,
  caption,
  onCaptionChange,
  tagInput,
  onTagInputChange,
  tags,
  onRemoveTag,
  onTagKeyDown,
}: DetailsStepProps) => {
  const selectedProducts = products.filter((p) =>
    selectedProductIds.includes(p.orderItemId),
  );

  const isVideo = files[0]?.type.startsWith("video/");

  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-semibold">Add the finishing touches</h5>
        <p className="mt-1 text-n-600">
          Write a caption and add relevant tags
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Media Preview */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-n-200">
            {isVideo ? (
              <video
                src={URL.createObjectURL(files[0])}
                controls
                className="aspect-9/16 w-full object-cover"
              />
            ) : (
              previews[0] && (
                <Image
                  src={previews[0]}
                  alt="Uploaded media"
                  className="aspect-9/16 w-full object-cover"
                />
              )
            )}
          </div>
        </div>

        {/* Right Side: Tagged Products + Form */}
        <div className="space-y-5 lg:col-span-3">
          {/* Tagged Products */}
          <div>
            <p className="mb-3 text-sm font-semibold text-n-700">
              Tagged Products ({selectedProducts.length})
            </p>
            <div className="space-y-2.5 lg:max-h-48 lg:overflow-y-auto">
              {selectedProducts.map((product) => (
                <div
                  key={product.orderItemId}
                  className="flex items-center gap-3 rounded-xl border border-n-200 p-2.5"
                >
                  <Image
                    src={product.productImage || product.mediaUrls?.[0]}
                    alt={product.productName}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {product.productName}
                    </p>
                    <span className="text-sm text-n-600">
                      {formatCurrency(product.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <Textarea
            label="Caption"
            placeholder="Write something about your reel..."
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            maxLength={MAX_CAPTION_LENGTH}
            showCount
            fullWidth
          />

          {/* Tags */}
          <div>
            <Input
              label="Tags"
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => onTagInputChange(e.target.value)}
              onKeyDown={onTagKeyDown}
              fullWidth
              disabled={tags.length >= MAX_TAGS}
              leftElement={
                <Icon name="Add" size="sm" className="text-n-500" />
              }
            />
            {tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-p-50 px-3 py-1 text-sm text-p-700"
                  >
                    {tag}
                    <button type="button" onClick={() => onRemoveTag(tag)}>
                      <Icon
                        name="X"
                        size="xs"
                        className="text-p-500 hover:text-p-700"
                      />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
