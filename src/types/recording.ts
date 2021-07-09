import { Event } from 'types/event';

export interface Recording {
  id: string;
  active: boolean;
  language: string;
  viewerId: string;
  duration: number;
  durationString: string;
  pages: string[];
  pageCount: number;
  startPage: string;
  exitPage: string;
  deviceType?: string;
  browser?: string;
  browserString?: string;
  viewportX: number;
  viewportY: number;
  events?: Event[];
  dateString: string;
}

export interface PaginatedRecordingsResponse {
  items: Recording[];
  pagination: RecordingPagination;
}

export interface RecordingPagination {
  pageSize: number;
  pageCount: number;
  sort: 'ASC' | 'DESC';
}
