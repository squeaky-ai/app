import { PaginatedRecordingsResponse } from 'types/recording';

export type VisitorSortBy =
  'RECORDINGS_COUNT_DESC' |
  'RECORDINGS_COUNT_ASC' |
  'FIRST_VIEWED_AT_DESC' |
  'FIRST_VIEWED_AT_ASC' |
  'LAST_ACTIVITY_AT_DESC' |
  'LAST_ACTIVITY_AT_ASC';

export type PageSortBy = 
  'VIEWS_COUNT_DESC' |
  'VIEWS_COUNT_ASC';

export interface Visitor {
  visitorId: string;
  recordingCount: number;
  firstViewedAt: string;
  lastActivityAt: string;
  language: string;
  viewportX: number;
  viewportY: number;
  deviceType: string;
  browser: string;
  browserString: string;
  pageViewCount?: number;
  recordings?: PaginatedRecordingsResponse;
  pages?: PaginatedPagesResponse;
  averageSessionDuration?: number;
  pagesPerSession?: number;
}

export interface PaginatedVisitorsResponse {
  items: Visitor[];
  pagination: VisitorPagination;
}

export interface VisitorPagination {
  pageSize: number;
  total: number;
  sort: VisitorSortBy;
}

export interface PaginatedPagesResponse {
  items: PageView[];
  pagination: PagePagination;
}

export interface PageView {
  pageView: string;
  pageViewCount: number;
  averageTimeOnPage: number;
}

export interface PagePagination {
  pageSize: number;
  total: number;
  sort: PageSortBy;
}
