import type { SearchMeta } from "@/types/search";

interface StatusBarProps {
  meta: SearchMeta;
  resultCount: number;
  relatedCount: number;
  hasKnowledge: boolean;
  hasAnswerBox: boolean;
}

export default function StatusBar({
  meta,
  resultCount,
  relatedCount,
  hasKnowledge,
  hasAnswerBox,
}: StatusBarProps) {
  const items = [
    `${resultCount} results`,
    `${relatedCount} related`,
    hasKnowledge && "knowledge graph",
    hasAnswerBox && "answer box",
    meta.time_taken,
  ].filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] flex-shrink-0" />
      {items.join(" · ")}
    </div>
  );
}
