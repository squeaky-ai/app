import type { Admin } from 'types/graphql';

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
  script: string;
  coveringEnabled: boolean;
}

export type AdminDashboard = Omit<
  Admin,
  'sites' |
  'users' | 
  'blogImages'
>;

export type ReferreredSiteColumns = 'lead' | 'inactive' | 'free' | 'paid';
