import type { Pagination } from './common';
import type { PaginatedEventsResponse } from './event';

export interface Recording {
  id: string;
  active: boolean;
  locale: string;
  viewerId: string;
  duration: number;
  pageCount: number;
  startPage: string;
  exitPage: string;
  useragent: string;
  viewportX: number;
  viewportY: number;
  events?: PaginatedEventsResponse;
}

export interface PaginatedRecordingsResponse {
  items: Recording[];
  pagination: Pagination;
}
