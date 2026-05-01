import { useToggle } from "@/hooks/useToggle";
import { Icon } from "@/components/base/icon/Icon";
import Dialog from "@/components/base/Dialog";
import { FeedbackForm } from "./FeedbackForm";

export function FeedbackButton() {
  const dialog = useToggle();

  return (
    <>
      <button
        onClick={dialog.open}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-n-300 text-n-900"
      >
        <Icon name="Feedback" size="lg" className="text-current" />
        <p className="flex-1 text-left font-semibold">Feedback & Suggestion</p>
      </button>

      <Dialog
        isOpen={dialog.isOpen}
        onClose={dialog.close}
        title="Feedback & Suggestion"
        size="sm"
        customContent
      >
        <FeedbackForm onClose={dialog.close} />
      </Dialog>
    </>
  );
}
