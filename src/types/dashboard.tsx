import type { Analytics, Recording, Notes, SitesCountry } from 'types/graphql';

export interface Dashboard {
  notes: Pick<Notes, 'items'>;
  analytics: Pick<Analytics, 'visitorsCount' | 'pageViewCount' | 'recordingsCount' | 'visitsAt'>;
  recordingLatest: Recording | null;
  countries: SitesCountry[];
}
