import { PlansCurrency } from 'types/graphql';
import type { Plan } from 'types/graphql';

export const getPricingForCurrency = (plan: Plan, currency: PlansCurrency) => {
  return (plan.pricing || []).find(p => p.currency === currency)?.amount || 0;
};
