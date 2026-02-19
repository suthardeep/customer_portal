import { Tabs, type Tab } from "@/components/base/Tabs";
import { ProductHighlights } from "./ProductHighlights";
import type { ProductHighlight, ProductSpecification } from "../types/types";

interface ProductTabsProps {
  highlights?: ProductHighlight[];
  specifications?: ProductSpecification[];
}

export function ProductTabs({ highlights, specifications }: ProductTabsProps) {
  const tabs: Tab[] = [
    {
      value: "highlights",
      label: "Highlights",
      content: <ProductHighlights highlights={highlights} />,
    },
    {
      value: "information",
      label: "Information",
      content: <SpecificationsTable specifications={specifications} />,
    },
  ];

  return <Tabs tabs={tabs} defaultValue="highlights" />;
}

interface SpecificationsTableProps {
  specifications?: ProductSpecification[];
}

function SpecificationsTable({ specifications }: SpecificationsTableProps) {
  if (!specifications || specifications.length === 0) {
    return <p className="text-sm text-n-600">No specifications available</p>;
  }

  return (
    <div className="border border-n-400 rounded-lg p-3 mt-3 w-full">
      <table className="w-full border-collapse">
        <tbody>
          {specifications.map((spec, idx) => (
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
  );
}
