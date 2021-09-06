import type { PaginatedRecordingsResponse } from 'types/recording';
import type { Device } from 'types/device';

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
  id: string;
  visitorId: string;
  viewed?: boolean;
  recordingsCount?: {
    total: number;
    new: number;
  }
  firstViewedAt?: string;
  lastActivityAt?: string;
  language?: string;
  devices: Device[];
  pageViewsCount?: {
    total: number;
    unique: number;
  }
  starred: boolean;
  attributes?: string;
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

export interface VisitorStarredMutationInput {
  siteId: string;
  visitorId: string;
  starred: boolean;
}

export interface ExternalAttributes {
  id: string;
  name?: string;
  email?: string;
  [key: string]: string;
}
