import { Currency } from 'types/graphql';
import type { Plan } from 'types/graphql';

export enum Interval {
  MONTHLY = 'month',
  YEARLY = 'year',
}

export const getPricingForCurrencyAndInterval = (plan: Plan, currency: Currency, interval: Interval) => {
  return (plan.pricing || [])
    .find(p => p.currency === currency && p.interval === interval)?.amount || 0;
};

export const getUsefulCurrency = (): Currency => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (['Europe/London', 'Europe/Belfast'].includes(tz)) {
    return Currency.Gbp;
  }

  if (tz.startsWith('Europe')) {
    return Currency.Eur;
  }

  return Currency.Usd;
};

export const toDecimalCurrency = (value: number) => {
  if (!value) return '0.00';

  const text = value.toString();
  const position = text.length - 2;

  return text.slice(0, position) + '.' + text.slice(position);
};
