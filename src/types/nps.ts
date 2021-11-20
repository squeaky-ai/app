import type { Visitor } from 'types/visitor';

export type NpsResponseSortBy =
  'timestamp__desc' |
  'timestamp__asc';

export interface Nps {
  responses: NpsResponse;
  groups: NpsGroups;
  stats: NpsStats;
}

export interface NpsResponse {
  items: NpsResponseItem[];
  pagination: NpsResponsePagination;
}

export interface NpsResponseItem {
  id: string;
  score: number;
  comment?: string;
  contact: boolean;
  visitor: Visitor;
  sessionId: string;
  recordingId: string;
  timestamp: string;
}

export interface NpsResponsePagination {
  pageSize: number;
  total: number;
  sort: NpsResponseSortBy;
}

export interface NpsGroups {
  promoters: number;
  passives: number;
  detractors: number;
}

export interface NpsStats {
  displays: number;
  ratings: number;
}
