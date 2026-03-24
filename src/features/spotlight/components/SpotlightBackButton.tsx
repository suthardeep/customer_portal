import { Icon } from "@/components/base/icon";
import { useCanGoBack, useRouter } from "@tanstack/react-router";

const SpotlightBackButton = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <>
      {" "}
      {canGoBack && (
        <div
          className="flex w-fit items-center gap-1 hover:bg-n-300 p-1 rounded-lg cursor-pointer"
          onClick={() => router.history.back()}
        >
          <Icon name={"ChevronLeft"} aria-label="go-back" className="mt-0.5" />
          <span className="text-n-900">Back</span>
        </div>
      )}
    </>
  );
};

export default SpotlightBackButton;
