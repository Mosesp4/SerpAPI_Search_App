# SerpApi Search App — JavaScript / Next.js 14, TypeScript

A production-ready search app built with **Javascript** **Next.js 14**, **TypeScript**, and **Tailwind CSS** that integrates [SerpApi](https://serpapi.com) to fetch and display live Google search results — without building or maintaining a scraper.

Built as a companion to the article: **[How to Integrate a Search API Into Your JavaScript App](https://medium.com/@echelamoses)**

---

## Features

- Live Google search results via SerpApi
- Tabbed UI — organic results, knowledge graph, related searches, raw JSON
- Answer box support (featured snippets)
- Clickable related searches that re-trigger queries
- Copy-to-clipboard on raw JSON panel
- Fully typed with TypeScript
- API key stays server-side (Next.js Route Handler)
- Deploy to Vercel in 2 minutes — zero config

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| API | SerpApi (`serpapi` npm package) |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Mosesp4/serpapi-search-app.git
cd serpapi-search-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

```bash
cp .env.local
```

Open `.env.local` and add your SerpApi key:

```
SERPAPI_KEY=your_api_key_here
```

Get a free key at [serpapi.com/manage-api-key](https://serpapi.com/manage-api-key).
The free tier gives you **100 searches/month** — enough for development and demos.

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
serpapi-search-app/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts        ← API Route Handler (replaces Express)
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── ResultCard.tsx
│   │   ├── KnowledgePanel.tsx
│   │   ├── RelatedSearches.tsx
│   │   ├── JsonViewer.tsx
│   │   └── StatusBar.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                ← Main search UI
├── types/
│   └── search.ts               ← Shared TypeScript interfaces
├── .env.example
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## API Route

The server exposes one endpoint — no Express needed:

```
GET /api/search?q=your+query&num=5
```

**Parameters:**

| Param | Type | Required | Description |
|---|---|---|---|
| `q` | string | Yes | The search query |
| `num` | number | No | Results to return (max 10, default 5) |

**Response shape:**

```typescript
{
  results: OrganicResult[];      // Main search results
  related: RelatedSearch[];      // "People also search for"
  knowledge: KnowledgeGraph | null;  // Entity info box
  answer_box: AnswerBox | null;  // Featured snippet
  meta: {
    query: string;
    total_results: string | null;
    time_taken: string | null;
    request_id: string | null;
  };
}
```

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

When prompted, add your environment variable:
- `SERPAPI_KEY` → your API key

Or deploy via the Vercel dashboard: connect your GitHub repo and add `SERPAPI_KEY` under **Settings → Environment Variables**. Every push to `main` deploys automatically.

---

## Extending This App

- **Add caching** — wrap the `getJson` call with `unstable_cache` from Next.js to cache results for N seconds and preserve API credits
- **Add more engines** — swap `engine: "google"` for `"bing"`, `"youtube"`, `"google_news"`, or `"google_maps"`
- **Track rankings** — store `position` values per domain in Supabase over time to build an SEO rank tracker
- **Add AI summaries** — pipe `results` into the Anthropic or OpenAI API to synthesize answers from live web data
- **Add pagination** — use the `start` parameter to fetch the next page of results

---

## Author

**Moses Echela** — Full-stack Engineer (Frontend) & Developer Advocate

- Medium: [medium.com/@echelamoses](https://medium.com/@echelamoses)
- LinkedIn: [linkedin.com/in/moses-echela-78845b260](https://www.linkedin.com/in/moses-echela-78845b260/)
- Portfolio: [moses-echela.vercel.app](https://moses-echela.vercel.app)
- GitHub: [github.com/Mosesp4](https://github.com/Mosesp4)

---

## License

MIT
