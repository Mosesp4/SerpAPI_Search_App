import type { OrganicResult } from "@/types/search";

interface ResultCardProps {
  result: OrganicResult;
  index: number;
}

export default function ResultCard({ result, index }: ResultCardProps) {
  return (
    <a
      href={result.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`result-card block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 no-underline animate-fade-up-delay-${Math.min(index + 1, 5)}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono text-[var(--muted)] bg-[var(--surface-2)] px-2 py-0.5 rounded-md border border-[var(--border)]">
          #{result.position}
        </span>
        <span className="text-[11px] font-mono text-[var(--muted)] truncate">
          {result.displayed_link}
        </span>
      </div>

      <h3 className="text-[var(--accent)] text-sm font-semibold mb-1.5 leading-snug hover:underline">
        {result.title}
      </h3>

      <p className="text-[var(--subtext)] text-xs leading-relaxed line-clamp-3">
        {result.snippet}
      </p>
    </a>
  );
}
