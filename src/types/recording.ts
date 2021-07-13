import { Event } from 'types/event';
import { User } from 'types/user';

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
  pageCount: number;
  sort: 'ASC' | 'DESC';
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
