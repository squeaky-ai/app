import { Team } from 'data/teams/types';
import { Recording, PaginatedRecordingsResponse } from 'data/recordings/types';

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

export interface SitesQueryResponse {
  sites: Site[];
}
