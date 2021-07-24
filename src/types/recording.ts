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
  active: boolean;
  language: string;
  sessionId: string;
  viewerId: string;
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
  events?: string;
  tags?: Tag[];
  notes?: Note[];
  dateString: string;
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
  site_id: string;
  session_id: string;
  name: string;
}

export interface TagDeleteMutationInput {
  site_id: string;
  session_id: string;
  tag_id: string;
}

export interface NoteCreateMutationInput {
  site_id: string;
  session_id: string;
  body: string;
  timestamp?: number;
}

export interface NoteDeleteMutationInput {
  site_id: string;
  session_id: string;
  note_id: string;
}

export interface NoteUpdateMutationInput {
  site_id: string;
  session_id: string;
  note_id: string;
  body?: string;
  timestamp?: number;
}
