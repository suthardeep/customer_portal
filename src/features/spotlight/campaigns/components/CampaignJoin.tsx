import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { Icon } from "@/components/base/icon";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/utils/cssHelpers";

const CampaignJoinButton = () => {
  const submissionDialog = useToggle();
  const handleSubmit = () => {};
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <>
      <Button fullWidth size="lg" onClick={submissionDialog.open}>
        Join & Submit
      </Button>
      <Dialog
        isOpen={submissionDialog.isOpen}
        onClose={submissionDialog.close}
        title="Submission"
      >
        <div className={cn("relative group")}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            className={cn(
              "flex h-full w-full cursor-pointer flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-n-500 bg-n-50 transition-colors hover:border-p-400 hover:bg-p-50",
            )}
          >
            <Icon
              name="PlayList"
              size="xl"
              className="text-n-800 group-hover:text-p-500"
            />
            <p className="text-n-800 group-hover:text-p-500 mt-4 mb-1 font-medium">
              Click here to upload a video or image
            </p>
            <span className="text-n-700 group-hover:text-p-400">
              Supports MP4, MOV, AVI · JPG, PNG, WEBP
            </span>
          </button>
        </div>
        <Button fullWidth className="mt-6" onClick={handleSubmit}>
          Submit
        </Button>
      </Dialog>
    </>
  );
};

export default CampaignJoinButton;
