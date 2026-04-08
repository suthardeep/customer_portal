import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dialog from "@/components/base/Dialog";
import { Select } from "@/components/base/select/Select";
import { Textarea } from "@/components/base/textarea/Textarea";
import { useReportPostMutation } from "@/features/spotlight/spotlightMutations";
import { ReportReason } from "@/features/spotlight/types/enums";
import { REPORT_REASON_OPTIONS } from "@/features/spotlight/constants";

const reportSchema = z.object({
  reason: z.nativeEnum(ReportReason),
  description: z.string().max(500).optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const ReportPostDialog: React.FC<ReportPostDialogProps> = ({ isOpen, onClose, postId }) => {
  const reportPost = useReportPostMutation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: ReportFormValues) => {
    reportPost.mutate(
      { postId, ...values },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Report Post"
      subTitle="Help us understand what's wrong with this post."
      size="sm"
      actions={{
        secondary: { label: "Cancel", onClick: handleClose },
        primary: {
          label: "Submit Report",
          onClick: handleSubmit(onSubmit),
          loading: reportPost.isPending,
        },
      }}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="reason"
          render={({ field }) => (
            <Select
              label="Reason"
              required
              options={REPORT_REASON_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.reason?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              label="Description (optional)"
              placeholder="Provide more details..."
              maxLength={500}
              showCount
              fullWidth
              error={errors.description?.message}
              {...field}
            />
          )}
        />
      </form>
    </Dialog>
  );
};

export default ReportPostDialog;
