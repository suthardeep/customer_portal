import { Button } from "@/components/base/button/Button";
import Sheet from "@/components/base/sheet/Sheet";
import QueryStateHandler from "@/components/compound/QueryStateHandler";
import { useToggle } from "@/hooks/useToggle";
import { useQuery } from "@tanstack/react-query";
import { productQueries } from "../productQueries";
import { SizeChartSheetSkeleton } from "./skeletons/SizeChartSheetSkeleton";

interface SizeChartSheetProps {
  sizeChartId?: string | null;
}

function SizeChartSheet({ sizeChartId }: SizeChartSheetProps) {
  const toggle = useToggle();

  if (!sizeChartId) return null;

  return (
    <>
      <Button variant="ghost" size="sm" startIcon="Ruler" onClick={toggle.open}>
        Size Chart
      </Button>

      <Sheet
        isOpen={toggle.isOpen}
        onClose={toggle.close}
        title="Size Chart"
        size="xl"
      >
        <SizeChartContent sizeChartId={sizeChartId} isOpen={toggle.isOpen} />
      </Sheet>
    </>
  );
}

function SizeChartContent({
  sizeChartId,
  isOpen,
}: {
  sizeChartId: string;
  isOpen: boolean;
}) {
  const query = useQuery({
    ...productQueries.sizeChart(sizeChartId),
    enabled: isOpen,
  });

  return (
    <QueryStateHandler
      query={query}
      loadingSkeleton={<SizeChartSheetSkeleton />}
      emptyTitle="No size chart data available"
    >
      {query.data && (
        <div className="p-4 space-y-3">
          <p className="text-sm text-n-800">Unit: {query.data.unit}</p>
          <div className="overflow-x-auto rounded-lg border border-n-500">
            <table className="w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-n-400">
                  {query.data.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`border-b border-n-500 px-4 py-3 text-left font-semibold text-n-950 ${i < query.data.columns.length - 1 ? "border-r" : ""} ${i === 0 ? "rounded-tl-lg" : ""} ${i === query.data.columns.length - 1 ? "rounded-tr-lg" : ""}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {query.data.rows.map((row, index) => (
                  <tr key={index} className="even:bg-n-300">
                    {query.data.columns.map((col, ci) => (
                      <td
                        key={col}
                        className={`border-n-500 px-4 py-3 text-n-950 ${ci < query.data.columns.length - 1 ? "border-r" : ""} ${index < query.data.rows.length - 1 ? "border-b" : ""} ${index === query.data.rows.length - 1 && ci === 0 ? "rounded-bl-lg" : ""} ${index === query.data.rows.length - 1 && ci === query.data.columns.length - 1 ? "rounded-br-lg" : ""}`}
                      >
                        {row[col] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </QueryStateHandler>
  );
}

export default SizeChartSheet;
