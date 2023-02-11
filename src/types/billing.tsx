import type { Plan, SitesPlan, SiteBilling, DecoratedPlan, SitesProviderAuth } from 'types/graphql';

export interface Billing {
  billing: SiteBilling;
  plan: SitesPlan;
  plans: DecoratedPlan[];
  providerAuth?: SitesProviderAuth;
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
