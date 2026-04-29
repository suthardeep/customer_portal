import { useFormContext } from "react-hook-form";
import { Image } from "@/components/base/Image";
import { Textarea } from "@/components/base/textarea/Textarea";
import { formatCurrency } from "@/utils/formatCurrency";
import type { OrderItem } from "@/features/account/my-orders/types/types";
import type { DetailsFormValues } from "../detailsSchema";
import { MAX_CAPTION_LENGTH } from "../constants";
import CreateShortTagsInput from "./CreateShortTagsInput";

interface DetailsStepProps {
  products: OrderItem[];
  selectedProductIds: string[];
  files: File[];
  previews: string[];
}

const DetailsStep = ({
  products,
  selectedProductIds,
  files,
  previews,
}: DetailsStepProps) => {
  const { register } = useFormContext<DetailsFormValues>();

  const selectedProducts = products.filter((p) =>
    selectedProductIds.includes(p.orderItemId),
  );

  const isVideo = files[0]?.type.startsWith("video/");

  return (
    <div className="space-y-4">
      <div>
        <h5 className="font-semibold">Add the finishing touches</h5>
        <p className="mt-1 text-n-800">Write a caption and add relevant tags</p>
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
            <div className="space-y-2.5">
              {selectedProducts.map((product) => (
                <div
                  key={product.orderItemId}
                  className="flex gap-3 rounded-xl border border-n-400 p-1 bg-n-200"
                >
                  <div className="size-12">
                    <Image
                      src={product.productImage || product.mediaUrls?.[0]}
                      alt={product.productName}
                      className="size-12 shrink-0 rounded-lg object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="truncate font-medium text-n-900">
                      {product.productName}
                    </p>
                    <p className="text-n-800 font-medium">
                      {formatCurrency(product.sellingPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <Textarea
            label="Caption"
            placeholder="Write something about your reel..."
            {...register("caption")}
            maxLength={MAX_CAPTION_LENGTH}
            showCount
            fullWidth
          />

          {/* Tags */}
          <CreateShortTagsInput />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;
