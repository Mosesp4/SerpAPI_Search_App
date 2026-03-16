"use client";

import { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import KnowledgePanel from "./components/KnowledgePanel";
import RelatedSearches from "./components/RelatedSearches";
import JsonViewer from "./components/JsonViewer";
import StatusBar from "./components/StatusBar";
import type { SearchResponse, Tab } from "@/types/search";

const TABS: { id: Tab; label: string }[] = [
  { id: "results", label: "organic_results" },
  { id: "knowledge", label: "knowledge_graph" },
  { id: "related", label: "related_searches" },
  { id: "json", label: "raw JSON" },
];

export default function Home() {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("results");

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    setActiveTab("results");

    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&num=5`
      );
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Request failed");

      setData(json as SearchResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const visibleTabs = TABS.filter((t) => {
    if (t.id === "knowledge") return !!data?.knowledge;
    if (t.id === "related") return (data?.related?.length ?? 0) > 0;
    return true;
  });

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto px-5 py-14">

        {/* Header */}
        <header className="mb-10 animate-fade-up">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="pulse-dot" />
            <span className="text-[11px] font-mono text-[var(--muted)] tracking-widest uppercase">
              serpapi · next.js · typescript
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] mb-2">
            Search the Web
          </h1>
          <p className="text-sm font-mono text-[var(--muted)]">
            Live Google results via SerpApi — clean JSON, zero scraping
          </p>
        </header>

        {/* Search bar */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <SearchBar onSearch={search} loading={loading} />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center gap-3 text-sm font-mono text-[var(--muted)] py-8">
            <div className="spinner" />
            Fetching from SerpApi…
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="animate-fade-up bg-red-950/30 border border-red-500/20 rounded-xl p-4 text-sm font-mono text-red-400">
            ✗ {error}
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <div className="animate-fade-up">

            {/* Status bar */}
            <div className="mb-4">
              <StatusBar
                meta={data.meta}
                resultCount={data.results.length}
                relatedCount={data.related.length}
                hasKnowledge={!!data.knowledge}
                hasAnswerBox={!!data.answer_box}
              />
            </div>

            {/* Answer box */}
            {data.answer_box && (
              <div className="mb-4 animate-fade-up bg-[var(--accent-dim)] border border-[var(--accent-border)] rounded-xl p-4">
                <p className="text-[11px] font-mono text-[var(--accent)] mb-1.5">
                  ▸ answer_box
                </p>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {data.answer_box.answer ?? data.answer_box.snippet}
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 border-b border-[var(--border)] mb-5">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-[12px] font-mono border-b-2 -mb-px transition-colors ${
                    activeTab === tab.id
                      ? "text-[var(--accent)] border-[var(--accent)]"
                      : "text-[var(--muted)] border-transparent hover:text-[var(--subtext)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab panels */}
            {activeTab === "results" && (
              <div className="flex flex-col gap-3">
                {data.results.length === 0 ? (
                  <p className="text-sm font-mono text-[var(--muted)] py-8 text-center">
                    No organic results returned.
                  </p>
                ) : (
                  data.results.map((r, i) => (
                    <ResultCard key={r.link} result={r} index={i} />
                  ))
                )}
              </div>
            )}

            {activeTab === "knowledge" && data.knowledge && (
              <KnowledgePanel data={data.knowledge} />
            )}

            {activeTab === "related" && data.related.length > 0 && (
              <RelatedSearches items={data.related} onSearch={search} />
            )}

            {activeTab === "json" && <JsonViewer data={data} />}

            {/* Meta footer */}
            {data.meta.total_results && (
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-6 pt-4 border-t border-[var(--border)]">
                {[
                  ["total_results", data.meta.total_results],
                  ["time_taken", data.meta.time_taken],
                  data.meta.request_id && [
                    "request_id",
                    data.meta.request_id.slice(0, 16) + "…",
                  ],
                ]
                  .filter(Boolean)
                  .map(([k, v]) => (
                    <p key={k as string} className="text-[11px] font-mono text-[var(--muted)]">
                      {k}{" "}
                      <span className="text-[var(--subtext)]">{v as string}</span>
                    </p>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!data && !loading && !error && (
          <div className="text-center py-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl mb-3 opacity-30">⌕</div>
            <p className="text-sm font-mono text-[var(--muted)]">
              Enter a query to fetch live search results
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-[11px] font-mono text-[var(--muted)]">
            Built by{" "}
            <a
              href="https://moses-echela.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              Moses Echela
            </a>
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--muted)]">
            <a
              href="https://medium.com/@echelamoses"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Article ↗
            </a>
            <a
              href="https://github.com/Mosesp4/serpapi-search-app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://serpapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] transition-colors"
            >
              SerpApi ↗
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
