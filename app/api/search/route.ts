import { getJson } from "serpapi";
import { NextRequest, NextResponse } from "next/server";
import type { SearchResponse, SearchError } from "@/types/search";

export async function GET(
  request: NextRequest
): Promise<NextResponse<SearchResponse | SearchError>> {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const num = Math.min(parseInt(searchParams.get("num") ?? "5"), 10);

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required." },
      { status: 400 }
    );
  }

  if (!process.env.SERPAPI_KEY) {
    return NextResponse.json(
      {
        error:
          "SERPAPI_KEY is not configured. Add it to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  try {
    const data = await getJson({
      engine: "google",
      api_key: process.env.SERPAPI_KEY,
      q,
      num,
      hl: "en",
    });

    const response: SearchResponse = {
      results: data.organic_results ?? [],
      related: data.related_searches ?? [],
      knowledge: data.knowledge_graph ?? null,
      answer_box: data.answer_box ?? null,
      meta: {
        query: q,
        total_results: data.search_information?.total_results ?? null,
        time_taken: data.search_information?.time_taken_displayed ?? null,
        request_id: data.search_metadata?.id ?? null,
      },
    };

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("Invalid API key") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
