import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-slate-600">/</span>}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-slate-100" : ""}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
