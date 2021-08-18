import type { User } from 'types/user';

export interface Note {
  id: string;
  timestamp: number;
  body: string;
  sessionId?: string;
  recordingId?: string;
  user?: User;
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

export interface PaginatedNotesResponse {
  items: Note[];
  pagination: NotePagination;
}

export interface NotePagination {
  pageSize: number;
  total: number;
}
