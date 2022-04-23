import type { Plan, SitesPlan, SiteBilling } from 'types/graphql';

export interface Billing {
  billing: SiteBilling;
  plan: SitesPlan;
  plans: Plan[];
}
