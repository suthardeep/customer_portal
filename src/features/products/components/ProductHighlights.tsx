import { useToggle } from "@/hooks/useToggle";
import type { ProductHighlight } from "../types/types";
import FallbackView from "@/components/empty-states/FallbackView";

interface ProductHighlightsProps {
  highlights?: ProductHighlight[];
}

export function ProductHighlights({ highlights }: ProductHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <FallbackView
        title="No highlights available"
        version="compact"
        classname="mt-2"
      />
    );
  }

  return (
    <div className="border border-n-400 rounded-lg p-3 mt-3 space-y-6">
      {highlights.map((highlight, idx) => (
        <div key={idx} className="space-y-3">
          {highlight.category && (
            <h3 className="font-semibold text-n-900">{highlight.category}</h3>
          )}

          <table className="w-full border-collapse">
            <tbody>
              {highlight.items.map((item, itemIdx) => (
                <HighlightRow
                  key={itemIdx}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

interface HighlightRowProps {
  label: string;
  value: string;
}

function HighlightRow({ label, value }: HighlightRowProps) {
  const expandToggle = useToggle();
  const isLongText = value.length > 150;
  const shouldTruncate = isLongText && !expandToggle.isOpen;

  return (
    <tr className="border-b border-n-200 last:border-0">
      <td className="py-3 pr-4 text-sm font-medium text-n-600 align-top w-1/3">
        {label}
      </td>
      <td className="py-3 text-sm text-n-900">
        <div>
          <p className={shouldTruncate ? "line-clamp-3" : ""}>{value}</p>
          {isLongText && (
            <button
              onClick={expandToggle.toggle}
              className="mt-1 text-sm font-medium text-p-600 hover:text-p-700"
            >
              {expandToggle.isOpen ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
