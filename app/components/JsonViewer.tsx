"use client";

import { useState } from "react";

interface JsonViewerProps {
  data: unknown;
}

function highlight(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"([^"]+)"(\s*:)/g, '<span style="color:#79b8ff">"$1"</span>$2')
    .replace(/:\s*"([^"]*)"/g, ': <span style="color:#9ecbff">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#fbbf24">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span style="color:#79b8ff">$1</span>')
    .replace(/:\s*(null)/g, ': <span style="color:#555a72">$1</span>');
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  function handleCopy() {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-fade-up relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-[11px] font-mono text-[var(--muted)] hover:text-[var(--text)] transition-colors bg-[var(--surface-2)] border border-[var(--border)] rounded-md px-2 py-1"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
      <pre
        className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 text-xs font-mono text-[var(--subtext)] overflow-auto max-h-[420px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlight(json) }}
      />
    </div>
  );
}
