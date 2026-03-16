"use client";

import type { RelatedSearch } from "@/types/search";

interface RelatedSearchesProps {
  items: RelatedSearch[];
  onSearch: (query: string) => void;
}

export default function RelatedSearches({
  items,
  onSearch,
}: RelatedSearchesProps) {
  return (
    <div className="animate-fade-up">
      <p className="text-[11px] font-mono text-[var(--muted)] mb-3">
        related_searches
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSearch(item.query)}
            className="related-tag bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1.5 text-xs text-[var(--subtext)] cursor-pointer font-mono"
          >
            {item.query}
          </button>
        ))}
      </div>
    </div>
  );
}
