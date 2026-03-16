"use client";

import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. best JavaScript frameworks 2025, SerpApi tutorial…"
        autoFocus
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="px-5 py-3 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
      >
        {loading ? "Searching…" : "Search →"}
      </button>
    </form>
  );
}
