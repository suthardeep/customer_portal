const COLUMNS = 5;
const ROWS = 5;

export function SizeChartSheetSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <div className="shimmer h-4 w-16 rounded" />
      <div className="overflow-x-auto rounded-lg border border-n-500">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-n-400">
              {Array.from({ length: COLUMNS }).map((_, i) => (
                <th
                  key={i}
                  className={`border-b border-n-500 px-4 py-3 ${i < COLUMNS - 1 ? "border-r" : ""} ${i === 0 ? "rounded-tl-lg" : ""} ${i === COLUMNS - 1 ? "rounded-tr-lg" : ""}`}
                >
                  <div className="shimmer h-4 w-12 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }).map((_, ri) => (
              <tr key={ri} className="even:bg-n-300">
                {Array.from({ length: COLUMNS }).map((_, ci) => (
                  <td
                    key={ci}
                    className={`border-n-500 px-4 py-3 ${ci < COLUMNS - 1 ? "border-r" : ""} ${ri < ROWS - 1 ? "border-b" : ""}`}
                  >
                    <div className="shimmer h-4 w-10 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
