import type { PaginatedEventsResponse } from 'types/event';

export interface Recording {
  id: string;
  active: boolean;
  language: string;
  viewerId: string;
  duration: number;
  pageCount: number;
  startPage: string;
  exitPage: string;
  deviceType?: string;
  browser?: string;
  viewportX: number;
  viewportY: number;
  events?: PaginatedEventsResponse;
}

export interface PaginatedRecordingsResponse {
  items: Recording[];
  pagination: RecordingPagination;
}

export interface RecordingPagination {
  pageSize: number;
  pageCount: number;
}
