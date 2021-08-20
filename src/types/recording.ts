import { Note } from 'types/note';
import { VisitorDetails } from 'types/visitor';
 
export type RecordingSortBy =
  'DATE_DESC' |
  'DATE_ASC' |
  'DURATION_DESC' |
  'DURATION_ASC' |
  'PAGE_SIZE_DESC' |
  'PAGE_SIZE_ASC';

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
  deviceType?: string;
  browser?: string;
  browserString?: string;
  viewportX: number;
  viewportY: number;
  events: PaginatedEventsResponse;
  tags?: Tag[];
  notes?: Note[];
  previousRecording?: Recording;
  nextRecording?: Recording;
  connectedAt: number;
  disconnectedAt: number;
  visitor: VisitorDetails;
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
