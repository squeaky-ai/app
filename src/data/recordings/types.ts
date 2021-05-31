import { Pagination } from 'data/common/types';
import { PaginatedEventsResponse } from 'data/events/types';

export interface Recording {
  id: string;
  active: boolean;
  locale: string;
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
