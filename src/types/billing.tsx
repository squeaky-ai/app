import type { Plan, SitesPlan, SiteBilling, DecoratedPlan } from 'types/graphql';

export interface Billing {
  billing: SiteBilling;
  plan: SitesPlan;
  plans: DecoratedPlan[];
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
