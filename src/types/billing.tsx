import type { Plan, SitesPlan, SiteBilling } from 'types/graphql';

export interface Billing {
  billing: SiteBilling;
  plan: SitesPlan;
  plans: Plan[];
}

export interface PlanData {
  name: string;
  plan: Plan;
  show: boolean;
  current: boolean;
  usage: string[];
  includesCapabilitiesFrom: string | null,
  capabilities: string[],
  options: string[],
}
