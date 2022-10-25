import { sum } from 'lodash';
import type { Currency, UsersPartner } from 'types/graphql';

export const getAllTimeCommission = (partner: UsersPartner, currency: Currency) => sum(
  partner.allTimeCommission
    .filter(c => c.currency === currency)
    .map(c => c.amount)
);

export const getHistoricalPayouts = (partner: UsersPartner, currency: Currency) => sum(
  partner.payOuts
    .filter(c => c.currency === currency)
    .map(c => c.amount)
);

export const getAvailablePayout = (partner: UsersPartner, currency: Currency) => (
  getAllTimeCommission(partner, currency) - getHistoricalPayouts(partner, currency)
);
