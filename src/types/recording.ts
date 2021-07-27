import { User } from 'types/user';

export type SortBy =
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
  durationString: string;
  pageViews: string[];
  pageCount: number;
  startPage: string;
  exitPage: string;
  deviceType?: string;
  browser?: string;
  browserString?: string;
  viewportX: number;
  viewportY: number;
  events: string;
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
  user: User;
}

export interface PaginatedRecordingsResponse {
  items: Recording[];
  pagination: RecordingPagination;
}

export interface RecordingPagination {
  pageSize: number;
  total: number;
  sort: SortBy;
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
