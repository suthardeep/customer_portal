import { useToggle } from "@/hooks/useToggle";
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
            <div key={groupIdx}>
              {group.groupName && (
                <p className="font-semibold text-n-900 mb-2">
                  {group.groupName}
                </p>
              )}
              <div className="border border-n-400 rounded-lg py-2 px-2.5">
                <table className="w-full border-collapse">
                  <tbody>
                    {group.fields.map((field) => (
                      <tr
                        key={field.id}
                        className="border-b border-n-200 last:border-0"
                      >
                        <td className="text-sm font-medium text-n-600 align-top w-1/3">
                          {field.name}
                        </td>
                        <td className="text-sm text-n-900 font-medium">
                          {field.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
