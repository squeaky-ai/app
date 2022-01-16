import type { User, Site } from 'types/graphql';

export type AdminTab = 'users' | 'sites';

export type Admin = {
  usersAdmin: User[];
  sitesAdmin: Site[];
}
