import { User } from 'types/user';

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
  viewerId: string;
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
}

export interface Tag {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  timestamp: number;
  body: string;
  user?: User;
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

export interface NoteCreateMutationInput {
  siteId: string;
  recordingId: string;
  body: string;
  timestamp?: number;
}

export interface NoteDeleteMutationInput {
  siteId: string;
  recordingId: string;
  noteId: string;
}

export interface NoteUpdateMutationInput {
  siteId: string;
  recordingId: string;
  noteId: string;
  body?: string;
  timestamp?: number;
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
