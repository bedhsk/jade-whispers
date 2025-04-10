"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="bg-[#e8e4d9] py-3">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center text-sm md:text-base">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-[#1a3a3a]">&gt;</span>}

              {item.isCurrent ? (
                <span className="font-medium text-[#1a3a3a]">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#1a3a3a] hover:text-[#d98c53] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
