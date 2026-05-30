import { useToggle } from "@/hooks/useToggle";
import Collapsible from "@/components/compound/Collapsible";
import type { ProductDetail, ProductHighlight } from "../types/types";
import FallbackView from "@/components/empty-states/FallbackView";

type ProductHighlightsProps = {
  highlights?: ProductHighlight[];
} & Pick<ProductDetail, "bulletPoints" | "customFields">;

export function ProductHighlights({
  highlights,
  bulletPoints,
  customFields,
}: ProductHighlightsProps) {
  const hasBulletPoints = bulletPoints && bulletPoints.length > 0;
  const hasCustomFields = customFields && customFields.length > 0;
  const hasHighlights = highlights && highlights.length > 0;

  if (!hasBulletPoints && !hasCustomFields && !hasHighlights) {
    return (
      <FallbackView
        title="No highlights available"
        version="compact"
        classname="mt-2"
      />
    );
  }

  return (
    <div className="p-4 space-y-6">
      {hasBulletPoints && (
        <div>
          <ul className="space-y-1.5">
            {bulletPoints!.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-n-800"
              >
                <span className="mt-1.5 size-1.5 rounded-full bg-p-500 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasHighlights && (
        <div className="border border-n-400 rounded-lg p-3 space-y-6">
          {highlights!.map((highlight, idx) => (
            <div key={idx} className="space-y-3">
              {highlight.category && (
                <h3 className="font-semibold text-n-900">
                  {highlight.category}
                </h3>
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
      )}

      {hasCustomFields && (
        <div className="space-y-4">
          {customFields!.map((group, groupIdx) => (
            <Collapsible
              key={groupIdx}
              defaultOpen
              trigger={
                <p className="font-semibold text-n-900">
                  {group.groupName ?? "Product Description"}
                </p>
              }
            >
              <div className="border border-n-300 rounded-lg overflow-hidden mt-2">
                {group.fields.map((field) => (
                  <div
                    key={field.id}
                    className="flex border-b border-n-200 last:border-0"
                  >
                    <div className="w-2/5 px-3 py-2.5 bg-p-50 text-sm font-medium text-n-900 self-stretch flex items-center">
                      {field.name}
                    </div>
                    <div className="flex-1 px-3 py-2.5 text-sm text-n-900 font-medium">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </Collapsible>
          ))}
        </div>
      )}
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
