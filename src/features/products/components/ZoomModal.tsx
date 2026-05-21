import Dialog from "@/components/base/Dialog";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";

interface ZoomModalProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ZoomModal({ image, isOpen, onClose }: ZoomModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      title="Product Image"
      customContent
      disableBackdropClose={false}
    >
      <div className="relative size-full flex items-center justify-center bg-n-300 p-4">
        <IconButton
          onClick={onClose}
          icon="X"
          aria-label="zoom-dialog-close"
          color="neutral"
          className="absolute top-4 right-4 z-10"
          variant="ghost"
        />

        <div className="max-w-7xl max-h-full">
          <Image
            src={image}
            alt="Product zoom"
            className="max-h-[90vh] object-contain"
            eager
          />
        </div>
      </div>
    </Dialog>
  );
}
