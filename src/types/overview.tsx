import type { Analytics } from 'types/analytics';
import type { PaginatedRecordingsResponse } from 'types/recording'
import type { PaginatedNotesResponse } from 'types/note';

export interface Overview {
  notes: Pick<PaginatedNotesResponse, 'items'>;
  analytics: Pick<Analytics, 'visitorsCount' | 'pageViews' | 'recordingsCount'>;
  recordings: Pick<PaginatedRecordingsResponse, 'items'>;
}
