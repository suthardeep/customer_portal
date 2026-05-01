import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { Input } from "@/components/base/input/Input";
import { MediaUploader } from "@/components/base/media-uploader/MediaUploader";
import { Select } from "@/components/base/select/Select";
import { Textarea } from "@/components/base/textarea/Textarea";
import ErrorText from "@/components/base/ErrorText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { QUERY_TYPE_OPTIONS } from "../constants";
import { useCreateSupportTicketMutation } from "../supportMutations";
import {
  supportFormSchema,
  type SupportFormData,
} from "../schemas/supportFormSchema";
import { SupportQueryTypeEnum } from "../types/types";

interface RaiseSupportTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_ATTACHMENTS = 5;
const MAX_MESSAGE_CHARS = 1000;

export function RaiseSupportTicketDialog({
  isOpen,
  onClose,
}: RaiseSupportTicketDialogProps) {
  const createMutation = useCreateSupportTicketMutation();
  const isMutating = createMutation.isPending;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      queryType: undefined,
      subject: "",
      message: "",
      orderId: "",
      attachments: [],
    },
  });

  const watchedQueryType = useWatch({ control, name: "queryType" });
  const watchedMessage = useWatch({ control, name: "message" });
  const watchedAttachments = useWatch({ control, name: "attachments" });

  const isOrderType = watchedQueryType === SupportQueryTypeEnum.ORDER;
  const attachments = watchedAttachments ?? [];

  const handleUpload = (index: number, url: string) => {
    const current = getValues("attachments");
    const updated = [...current];
    updated[index] = url;
    setValue("attachments", updated, { shouldValidate: true });
  };

  const handleRemove = (index: number) => {
    const current = getValues("attachments");
    setValue(
      "attachments",
      current.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: SupportFormData) => {
    createMutation.mutate(
      {
        queryType: data.queryType,
        subject: data.subject,
        message: data.message,
        orderId: data.orderId || undefined,
        attachments: data.attachments,
      },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Raise a Ticket"
      size="lg"
      disableBackdropClose={isMutating}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-4"
      >
        <Controller
          name="queryType"
          control={control}
          render={({ field }) => (
            <Select
              label="Query Type"
              options={QUERY_TYPE_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select a query type"
              error={errors.queryType?.message}
              disabled={isMutating}
              required
              fullWidth
            />
          )}
        />

        <Input
          label="Subject"
          {...register("subject")}
          placeholder="Brief summary of your issue"
          disabled={isMutating}
          error={errors.subject?.message}
          required
          fullWidth
        />

        {isOrderType && (
          <Input
            label="Order ID"
            {...register("orderId")}
            placeholder="Enter your order ID"
            disabled={isMutating}
            error={errors.orderId?.message}
            fullWidth
          />
        )}

        <Textarea
          label="Message"
          {...register("message")}
          placeholder="Describe your issue in detail..."
          rows={5}
          maxLength={MAX_MESSAGE_CHARS}
          disabled={isMutating}
          error={errors.message?.message}
          customCount={`${watchedMessage?.length ?? 0}/${MAX_MESSAGE_CHARS}`}
          required
          fullWidth
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-n-800">
            Attachments{" "}
            <span className="text-n-500 font-normal">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {attachments.map((url, idx) => (
              <MediaUploader
                key={idx}
                defaultImage={url}
                onUpload={(newUrl) => handleUpload(idx, newUrl)}
                onRemove={() => handleRemove(idx)}
                wrapperClassName="size-20 shrink-0"
                imageClassName="rounded-xl border border-n-300"
                placeholderClassName="rounded-xl"
              />
            ))}
            {attachments.length < MAX_ATTACHMENTS && (
              <MediaUploader
                key={`new-${attachments.length}`}
                onUpload={(url) => handleUpload(attachments.length, url)}
                wrapperClassName="size-20 shrink-0"
                imageClassName="rounded-xl border border-n-300"
                placeholderClassName="rounded-xl"
              />
            )}
          </div>
          {errors.attachments && (
            <ErrorText>{errors.attachments.message as string}</ErrorText>
          )}
        </div>

        <Button type="submit" fullWidth isLoading={isMutating}>
          Submit Ticket
        </Button>
      </form>
    </Dialog>
  );
}
