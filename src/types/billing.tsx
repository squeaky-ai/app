import type { Plan, SiteBilling } from 'types/graphql';

export interface Billing {
  billing: SiteBilling;
  plans: Plan[];
}
