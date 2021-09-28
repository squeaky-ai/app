import type { Team } from 'types/team';
import type { Recording, PaginatedRecordingsResponse } from 'types/recording';
import type { Analytics } from 'types/analytics';
import type { PaginatedNotesResponse } from 'types/note';
import type { PaginatedVisitorsResponse, Visitor } from 'types/visitor';

export interface Site {
  id: string;
  name: string;
  url: string;
  plan: number;
  planName: string;
  uuid: string;
  ownerName: string;
  team: Team[];
  notes?: PaginatedNotesResponse;
  languages?: string[];
  pages?: string[];
  browsers?: string[];
  recording?: Recording;
  recordings?: PaginatedRecordingsResponse;
  visitor?: Visitor;
  visitors?: PaginatedVisitorsResponse;
  analytics?: Analytics;
  verifiedAt?: string;
  daysSinceLastRecording?: number;
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

export interface SiteMutationInput {
  siteId: string;
  name?: string;
  url?: string;
}

export interface SiteDeleteMutationInput {
  siteId: string;
}

export interface SiteVerifyMutationInput {
  siteId: string;
}
