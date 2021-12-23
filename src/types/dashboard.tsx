import type { Analytics, Recording, Notes } from 'types/graphql';

export interface Dashboard {
  notes: Pick<Notes, 'items'>;
  analytics: Pick<Analytics, 'visitorsCount' | 'pageViewCount' | 'recordingsCount'>;
  recordingLatest: Recording | null;
}
