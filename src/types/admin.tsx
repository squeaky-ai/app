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

export enum AdminUserPartnerTabs {
  REFERRERD_SITES,
  REVENUE_COMMISSION,
  INVOICES,
}

export type ReferreredSiteColumns = 'lead' | 'inactive' | 'free' | 'paid';

export enum InvoicesSort {
  IssuedAtAsc = 'issued_at__asc',
  IssuedAtDesc = 'issued_at__desc',
  DueAtAsc = 'due_at__asc',
  DueAtDesc = 'due_at__desc',
  PaidAtAsc = 'paid_at__asc',
  PaidAtDesc = 'paid_at__desc',
}
