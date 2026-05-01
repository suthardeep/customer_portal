import Pagination from "@/components/compound/Pagination";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import FallbackView from "@/components/empty-states/FallbackView";
import AccountPageHeader from "@/features/account/components/AccountPageHeader";
import AccountPageWrapper from "@/features/account/components/AccountPageWrapper";
import { RaiseSupportTicketDialog } from "@/features/account/support/components/RaiseSupportTicketDialog";
import { SupportTicketCard } from "@/features/account/support/components/SupportTicketCard";
import { SupportTicketDetailDialog } from "@/features/account/support/components/SupportTicketDetailDialog";
import { SupportTicketListSkeleton } from "@/features/account/support/components/skeletons/SupportTicketListSkeleton";
import { SUPPORT_PAGE_SIZE } from "@/features/account/support/constants";
import { supportQueries } from "@/features/account/support/supportQueries";
import type { SupportTicket } from "@/features/account/support/types/types";
import { useToggle } from "@/hooks/useToggle";
import { Button } from "@/components/base/button/Button";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

const supportSearchSchema = z.object({
  currentPage: z.number().int().min(1).catch(1),
});

export const Route = createFileRoute("/_protected/account/support/")({
  validateSearch: supportSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    const { currentPage } = deps;
    await context.queryClient.ensureQueryData(
      supportQueries.list({ currentPage, pageSize: SUPPORT_PAGE_SIZE }),
    );
  },
  pendingComponent: SupportTicketListSkeleton,
  errorComponent: () => (
    <FallbackView
      title="Unable to load your tickets"
      icon="Support"
      color="danger"
    />
  ),
  component: SupportComponent,
});

function SupportComponent() {
  const { currentPage } = Route.useSearch();
  const params = { currentPage, pageSize: SUPPORT_PAGE_SIZE };
  const ticketsQuery = useQuery(supportQueries.list(params));

  const raiseDialog = useToggle();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );

  return (
    <AccountPageWrapper>
      <AccountPageHeader
        title="Support Tickets"
        trailingTitleComponent={
          <Button size="sm" onClick={raiseDialog.open}>
            Raise a Ticket
          </Button>
        }
      />

      <QueryStateHandler
        query={ticketsQuery}
        loadingSkeleton={<SupportTicketListSkeleton />}
        emptyTitle="No support tickets yet"
        fallbackIcon="Support"
        isEmpty={ticketsQuery.data?.meta?.totalRows === 0}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ticketsQuery.data?.data.map((ticket) => (
            <SupportTicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={setSelectedTicket}
            />
          ))}
        </div>
        {ticketsQuery.data && (
          <Pagination
            {...ticketsQuery.data.meta}
            scrollToTopOnPageChange
            className="mt-6"
          />
        )}
      </QueryStateHandler>

      <RaiseSupportTicketDialog
        isOpen={raiseDialog.isOpen}
        onClose={raiseDialog.close}
      />

      <SupportTicketDetailDialog
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </AccountPageWrapper>
  );
}
