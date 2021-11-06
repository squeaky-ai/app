import type { Analytics } from 'types/analytics';
import type { Recording } from 'types/recording'
import type { PaginatedNotesResponse } from 'types/note';

export interface Overview {
  notes: Pick<PaginatedNotesResponse, 'items'>;
  analytics: Pick<Analytics, 'visitorsCount' | 'pageViewCount' | 'recordingsCount'>;
  recordingLatest: Recording | null;
}
