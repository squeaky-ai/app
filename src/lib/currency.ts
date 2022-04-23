import { PlansCurrency } from 'types/graphql';
import type { Plan } from 'types/graphql';

export const getPricingForCurrency = (plan: Plan, currency: PlansCurrency) => {
  return (plan.pricing || []).find(p => p.currency === currency)?.amount || 0;
};

export const getUsefulCurrency = (): PlansCurrency => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (['Europe/London', 'Europe/Belfast'].includes(tz)) {
    return PlansCurrency.Gbp;
  }

  if (tz.startsWith('Europe')) {
    return PlansCurrency.Eur;
  }

  return PlansCurrency.Usd;
};

export const formatCurency = (currency: PlansCurrency, amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return formatter.format(amount);
};
