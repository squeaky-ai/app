import type { Note } from 'types/note';
import type { Visitor } from 'types/visitor';
import type { Device } from 'types/device';
 
export type RecordingSortBy =
  'connected_at__desc' |
  'connected_at__asc' |
  'duration__desc' |
  'duration__asc' |
  'page_count__desc' |
  'page_count__asc';

export interface Recording {
  id: string;
  language: string;
  sessionId: string;
  viewed: boolean;
  bookmarked: boolean;
  duration: number;
  pageViews: string[];
  pageCount: number;
  startPage: string;
  exitPage: string;
  device: Device;
  events: PaginatedEventsResponse;
  tags?: Tag[];
  notes?: Note[];
  previousRecording?: Recording;
  nextRecording?: Recording;
  connectedAt: number;
  disconnectedAt: number;
  visitor: Visitor;
}

export interface Tag {
  id: string;
  name: string;
}

export interface PaginatedRecordingsResponse {
  items: Recording[];
  pagination: RecordingPagination;
}

export interface RecordingPagination {
  pageSize: number;
  total: number;
  sort: RecordingSortBy;
}

export interface TagCreateMutationInput {
  siteId: string;
  recordingId: string;
  name: string;
}

export interface TagDeleteMutationInput {
  siteId: string;
  recordingId: string;
  tagId: string;
}

export interface DeleteRecordingMutationInput {
  siteId: string;
  recordingId: string;
}

export interface ViewedRecordingMutationInput {
  siteId: string;
  recordingId: string;
}

export interface BookmarkRecordingMutationInput {
  siteId: string;
  recordingId: string;
  bookmarked: boolean;
}

export interface PaginatedEventsResponse {
  items: string[];
  pagination: EventPagination;
}

export interface EventPagination {
  perPage: number;
  itemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface Filters {
  browsers: string[];
  devices: string[];
  languages: string[];
  startUrl: string | null;
  exitUrl: string | null;
  visitedPages: string[];
  unvisitedPages: string[];
  status: 'New' | 'Viewed' | null;
  date: {
    dateRangeType: 'From' | 'Between' | null;
    dateFromType: 'Before' | 'After' | null;
    fromDate: string | null;
    betweenFromDate: string | null;
    betweenToDate: string | null;
  };
  duration: {
    durationRangeType: 'From' | 'Between' | null;
    durationFromType: 'GreaterThan' | 'LessThan' | null;
    fromDuration: number | null;
    betweenFromDuration: number | null;
    betweenToDuration: number | null;
  };
  viewport: {
    minWidth: number | null;
    maxWidth: number | null;
    minHeight: number | null;
    maxHeight: number | null;
  }
}
