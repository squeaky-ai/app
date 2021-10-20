import type { PaginatedRecordingsResponse } from 'types/recording';
import type { Device } from 'types/device';
import type { DateFilter } from 'types/common';

export type VisitorSortBy =
  'first_viewed_at__desc' |
  'first_viewed_at__asc' |
  'last_activity_at__desc' |
  'last_activity_at__asc';

export type PageSortBy = 
  'views_count__desc' |
  'views_count__asc';

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

export interface Column {
  name: string;
  label: string;
  width: string;
  disabled: boolean;
}

export interface Filters {
  status: 'New' | 'Viewed' | null;
  recordings: {
    rangeType: 'LessThan' | 'GreaterThan' | null;
    count: number | null;
  };
  languages: string[];
  firstVisited: DateFilter;
  lastActivity: DateFilter;
}
