import type { User, Site } from 'types/graphql';

export type AdminTab = 'users' | 'sites' | 'blog';

export type Admin = {
  usersAdmin: User[];
  sitesAdmin: Site[];
}

export type AdminBlog = {
  blogImagesAdmin: string[];
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
  'created_at__desc' | 
  'active_visitors__asc' |
  'active_visitors__desc';

export type BlogAuthor = {
  name: string;
  image: string;
}

export type BlogInput = {
  title: string;
  tags: string;
  author: 'chris' | 'lewis';
  category: string;
  draft: boolean;
  metaImage: string;
  metaDescription: string;
  body: string;
}
