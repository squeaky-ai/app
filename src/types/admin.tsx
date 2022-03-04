import type { User, Site, ActiveVisitorCount } from 'types/graphql';

export type AdminTab = 'users' | 'sites';

export type Admin = {
  usersAdmin: User[];
  sitesAdmin: Site[];
  activeVisitorsAdmin: ActiveVisitorCount[];
}

export type UserSort = 
  'name__asc' |
  'name__desc' |
  'superuser__asc' |
  'superuser__desc' |
  'created_at__asc' |
  'created_at__desc';

export type SitesSort = 
  'name__asc' |
  'name__desc' |
  'plan_name__asc' |
  'plan_name__desc' |
  'team_count__asc' |
  'team_count__desc' |
  'created_at__asc' |
  'created_at__desc';
