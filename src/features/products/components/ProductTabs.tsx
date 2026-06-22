import { Tabs, type Tab } from "@/components/base/Tabs";
import { ProductHighlights } from "./ProductHighlights";
import FallbackView from "@/components/empty-states/FallbackView";
import type {
  ProductDetail,
  ProductHighlight,
  ProductSpecification,
} from "../types/types";

type ProductTabsProps = {
  highlights?: ProductHighlight[];
  specifications?: ProductSpecification[];
  description?: string;
  bulletPoints?: string[];
} & Pick<ProductDetail, "customFields">;

export function ProductTabs({
  highlights,
  specifications,
  description,
  bulletPoints,
  customFields,
}: ProductTabsProps) {
  const tabs: Tab[] = [
    {
      value: "highlights",
      label: "Highlights",
      content: (
        <ProductHighlights
          highlights={highlights}
          bulletPoints={bulletPoints}
          customFields={customFields}
        />
      ),
    },
    {
      value: "information",
      label: "Information",
      content: (
        <InformationTab
          description={description}
          specifications={specifications}
        />
      ),
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      defaultValue="highlights"
      className="border border-n-400 rounded-lg"
    />
  );
}

interface InformationTabProps {
  description?: string;
  specifications?: ProductSpecification[];
}

function InformationTab({ description, specifications }: InformationTabProps) {
  const hasDescription = !!description;
  const hasSpecifications = specifications && specifications.length > 0;

  if (!hasDescription && !hasSpecifications) {
    return (
      <FallbackView
        title="No information available"
        version="compact"
        classname="mt-2"
      />
    );
  }

  return (
    <div className="p-4 space-y-6">
      {hasDescription && (
        <p className="text-sm text-n-800 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      )}

      {hasSpecifications && (
        <div className="border border-n-400 rounded-lg p-3 w-full">
          <table className="w-full border-collapse">
            <tbody>
              {specifications!.map((spec, idx) => (
                <tr key={idx} className="border-b border-n-200 last:border-0">
                  <td className="py-3 pr-4 text-sm font-medium text-n-800 w-1/3">
                    {spec.label}
                  </td>
                  <td className="py-3 text-sm text-n-950 font-medium">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
