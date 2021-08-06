export type SortBy =
  'RECORDING_COUNT_DESC' |
  'RECORDING_COUNT_ASC' |
  'FIRST_VIEWED_AT_DESC' |
  'FIRST_VIEWED_AT_ASC' |
  'LAST_ACTIVITY_AT_DESC' |
  'LAST_ACTIVITY_AT_ASC';

export interface Visitor {
  viewerId: string;
  recordingCount: number;
  firstViewedAt: string;
  lastActivityAt: string;
  language: string;
  viewportX: number;
  viewportY: number;
  deviceType: string;
  browser: string;
  browserString: string;
}

export interface PaginatedVisitorsResponse {
  items: Visitor[];
  pagination: VisitorPagination;
}

export interface VisitorPagination {
  pageSize: number;
  total: number;
  sort: SortBy;
}
