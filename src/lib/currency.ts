import { PlansCurrency } from 'types/graphql';
import type { Plan } from 'types/graphql';

export enum Interval {
  MONTHLY = 'month',
  YEARLY = 'year',
}

export const getPricingForCurrencyAndInterval = (plan: Plan, currency: PlansCurrency, interval: Interval) => {
  console.log(interval, plan.pricing);
  return (plan.pricing || [])
    .find(p => p.currency === currency && p.interval === interval)?.amount || 0;
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

export const toDecimalCurrency = (value: number) => {
  const text = value.toString();
  const position = text.length - 2;

  return text.slice(0, position) + '.' + text.slice(position);
};
