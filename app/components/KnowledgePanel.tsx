import type { KnowledgeGraph } from "@/types/search";
import { } from "react";

export default function KnowledgePanel({ data }: { data: KnowledgeGraph }) {
  return (
    <div className="animate-fade-up bg-[var(--surface)] border border-[var(--accent-border)] border-l-2 border-l-[var(--accent)] rounded-xl p-4">
      <div className="flex items-start gap-3">
        {data.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.image}
            alt={data.title}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-[var(--border)]"
          />
        )}
        <div className="min-w-0">
          <h3 className="text-[var(--text)] text-base font-semibold leading-tight mb-0.5">
            {data.title}
          </h3>
          {data.type && (
            <p className="text-[11px] font-mono text-[var(--accent)] mb-2">
              {data.type}
            </p>
          )}
          {data.description && (
            <p className="text-[var(--subtext)] text-sm leading-relaxed">
              {data.description}
            </p>
          )}
          {data.source && (
            <a
              href={data.source.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[11px] font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              Source: {data.source.name} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
