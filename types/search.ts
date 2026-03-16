export interface OrganicResult {
  position: number;
  title: string;
  link: string;
  displayed_link: string;
  snippet: string;
  favicon?: string;
}

export interface RelatedSearch {
  query: string;
  link?: string;
}

export interface KnowledgeGraph {
  title: string;
  type?: string;
  description?: string;
  source?: { name: string; link: string };
  image?: string;
}

export interface AnswerBox {
  type?: string;
  answer?: string;
  snippet?: string;
  title?: string;
}

export interface SearchMeta {
  query: string;
  total_results: string | null;
  time_taken: string | null;
  request_id: string | null;
}

export interface SearchResponse {
  results: OrganicResult[];
  related: RelatedSearch[];
  knowledge: KnowledgeGraph | null;
  answer_box: AnswerBox | null;
  meta: SearchMeta;
}

export interface SearchError {
  error: string;
}

export type Tab = "results" | "knowledge" | "related" | "json";
