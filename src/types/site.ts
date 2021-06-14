import type { Team } from './team';
import type { Recording, PaginatedRecordingsResponse } from './recording';

export interface Site {
  id: string;
  name: string;
  url: string;
  avatar?: string;
  plan: number;
  planName: string;
  uuid: string;
  ownerName: string;
  team: Team[];
  recording?: Recording;
  recordings?: PaginatedRecordingsResponse;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteQueryResponse {
  site: Site | null;
}

export interface SitesQueryResponse {
  sites: Site[];
}

export interface SiteMutationResponse {
  site?: Site;
  error?: { [key: string]: string };
}
