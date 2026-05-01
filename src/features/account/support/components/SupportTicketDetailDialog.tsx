import { Chip } from "@/components/base/chip/Chip";
import Dialog from "@/components/base/Dialog";
import { Image } from "@/components/base/Image";
import { prettyDate } from "@/utils/formatDateTime";
import {
  QUERY_TYPE_CONFIG,
  TICKET_STATUS_CONFIG,
} from "../constants";
import type { SupportTicket } from "../types/types";

interface SupportTicketDetailDialogProps {
  ticket: SupportTicket | null;
  onClose: () => void;
}

export function SupportTicketDetailDialog({
  ticket,
  onClose,
}: SupportTicketDetailDialogProps) {
  if (!ticket) return null;

  const statusConfig = TICKET_STATUS_CONFIG[ticket.status];
  const queryTypeLabel = QUERY_TYPE_CONFIG[ticket.queryType].label;

  return (
    <Dialog
      isOpen={!!ticket}
      onClose={onClose}
      title={ticket.subject}
      size="md"
    >
      <div className="flex flex-col gap-5 mt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Chip color={statusConfig.color} size="sm">
            {statusConfig.label}
          </Chip>
          <Chip color="neutral" variant="outline" size="sm">
            {queryTypeLabel}
          </Chip>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-n-700">Message</p>
          <p className="text-n-900 whitespace-pre-wrap">{ticket.message}</p>
        </div>

        {ticket.orderId && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-n-700">Order ID</p>
            <p className="text-n-900 font-mono text-sm">{ticket.orderId}</p>
          </div>
        )}

        {ticket.attachments.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-n-700">Attachments</p>
            <div className="flex flex-wrap gap-2">
              {ticket.attachments.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-20 shrink-0 overflow-hidden rounded-xl border border-n-300"
                >
                  <Image
                    src={url}
                    alt={`Attachment ${idx + 1}`}
                    className="size-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0.5 pt-1 border-t border-n-300">
          <p className="text-sm text-n-600">
            Raised on {prettyDate(ticket.createdAt, { showYear: true, disableRelativeDates: true })}
          </p>
          {ticket.updatedAt !== ticket.createdAt && (
            <p className="text-sm text-n-600">
              Last updated {prettyDate(ticket.updatedAt, { showYear: true })}
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
