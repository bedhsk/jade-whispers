"use client";

import Link from "next/link";

interface StoryHeaderProps {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: {
    name: string;
    slug: string;
  };
}

const StoryHeader = ({
  title,
  subtitle,
  author,
  date,
  category,
}: StoryHeaderProps) => {
  return (
    <header className="bg-[#1a3a3a] text-[#d1c5a5] p-8 md:p-12 rounded-t-lg">
      <div className="max-w-4xl mx-auto text-center py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-10">{subtitle}</p>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-4 md:mb-0">
            <span className="font-medium">Por: {author}</span>
          </div>

          <Link
            href={`/historias?categoria=${category.slug}`}
            className="px-4 py-1 rounded-full bg-[#d98c53] text-white text-sm font-medium hover:bg-opacity-90 transition-colors mb-4 md:mb-0"
          >
            {category.name}
          </Link>

          <div className="text-sm">{date}</div>
        </div>
      </div>
    </header>
  );
};

export default StoryHeader;
