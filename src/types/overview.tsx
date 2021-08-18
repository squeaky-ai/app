import type { Analytics } from 'types/analytics';
import type { PaginatedRecordingsResponse } from 'types/recording'

export interface Overview {
  analytics: Pick<Analytics, 'visitors' | 'pageViews' | 'recordingsCount'>;
  recordings: Pick<PaginatedRecordingsResponse, 'items'>;
}
