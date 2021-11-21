import type { Visitor } from 'types/visitor';

export type SentimentResponseSortBy =
  'timestamp__desc' |
  'timestamp__asc';

export interface Sentiment {
  responses: SentimentResponse;
  replies: SentimentReplies;
}

export interface SentimentResponse {
  items: SentimentResponseItem[];
  pagination: SentimentResponsePagination;
}

export interface SentimentResponseItem {
  id: string;
  score: number;
  comment?: string;
  visitor: Visitor;
  sessionId: string;
  recordingId: string;
  timestamp: string;
}

export interface SentimentResponsePagination {
  pageSize: number;
  total: number;
  sort: SentimentResponseSortBy;
}

export interface SentimentReplies {
  total: number;
  responses: SentimentReply[];
}

export interface SentimentReply {
  score: number;
}
