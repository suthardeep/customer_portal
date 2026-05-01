import { Chip } from "@/components/base/chip/Chip";
import { prettyDate } from "@/utils/formatDateTime";
import { QUERY_TYPE_CONFIG, TICKET_STATUS_CONFIG } from "../constants";
import type { SupportTicket } from "../types/types";

interface SupportTicketCardProps {
  ticket: SupportTicket;
  onClick: (ticket: SupportTicket) => void;
}

export function SupportTicketCard({ ticket, onClick }: SupportTicketCardProps) {
  const statusConfig = TICKET_STATUS_CONFIG[ticket.status];
  const queryTypeLabel = QUERY_TYPE_CONFIG[ticket.queryType].label;

  return (
    <button
      type="button"
      onClick={() => onClick(ticket)}
      className="w-full text-left flex flex-col gap-3 rounded-xl border border-n-400 bg-n-50 p-4 cursor-pointer hover:bg-n-200 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <h6 className="font-medium line-clamp-2 flex-1">{ticket.subject}</h6>
        <Chip color={statusConfig.color} size="xs" className="shrink-0">
          {statusConfig.label}
        </Chip>
      </div>

      <p className="text-n-700 line-clamp-2">{ticket.message}</p>
      <div className="flex items-center gap-2 justify-between">
        <Chip color="neutral" variant="outline" size="xs">
          {queryTypeLabel}
        </Chip>
        <p className="text-n-700">
          {prettyDate(ticket.createdAt, { showYear: true })}
        </p>
      </div>
    </button>
  );
}
