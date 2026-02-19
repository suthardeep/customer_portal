import { Link } from "@tanstack/react-router";
import { Icon } from "./icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="text-n-800 transition-colors hover:text-p-600"
              >
                {item.label}
              </Link>
            ) : (
              <p className={isLast ? "text-n-900 font-medium" : "text-n-800"}>
                {item.label}
              </p>
            )}

            {!isLast && (
              <Icon name="ChevronRight" size="md" className="text-n-600" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
