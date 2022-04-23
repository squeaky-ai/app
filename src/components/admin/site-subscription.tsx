import React from 'react';
import type { FC } from 'react';
import { startCase, last } from 'lodash';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { toddMMYYY } from 'lib/dates';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { toDecimalCurrency } from 'lib/currency';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  isEnterprise: boolean;
  hasBilling: boolean;
}

export const SiteSubscription: FC<Props> = ({ site, isEnterprise, hasBilling }) => {
  const latestTransaction = last(site?.billing?.transactions);

  return (
    <div className='subscription'>
      <div>
        <h5>
          <Icon name='price-tag-3-line' />
          Subscription
        </h5>
        <div className='row'>
          <span>Plan</span>
          <span>
            {site.plan.name}
            {isEnterprise && latestTransaction && (
              <>: {CURRENCY_SYMBOLS[latestTransaction.currency]}{toDecimalCurrency(latestTransaction.amount)} per {latestTransaction.interval}</>
            )}
          </span>
        </div>
        {isEnterprise && (
          <div className='row'>
            <span>Coupons</span>
            <span>
              {hasBilling && latestTransaction?.discountName
                ? <span className='coupon'>{`${Number(latestTransaction.discountPercentage)}% ${latestTransaction.discountName}`}</span>
                : '-'
              }
            </span>
          </div>
        )}
        <div className='row'>
          <span>Plan Exceeded</span>
          <span>
            {site.plan.exceeded 
              ? <Pill className='tertiary'>Yes</Pill> 
              : <Pill className='secondary'>No</Pill>
            }
          </span>
        </div>
        <div className='row'>
          <span>Billing Interval</span>
          <span>
            {hasBilling
              ? latestTransaction?.interval === 'month' ? 'Monthly' : 'Yearly'
              : '-'
            }
          </span>
        </div>
        <div className='row'>
          <span>Next Payment</span>
          <span>
            {hasBilling && latestTransaction
              ? toddMMYYY(new Date(latestTransaction?.periodEndAt))
              : '-'
            }
          </span>
        </div>
        <div className='row'>
          <span>Payment Method</span>
          <span>
            {hasBilling
              ? `${startCase(site.billing.cardType)} ending in ${site.billing.cardNumber}`
              : '-'
            }</span>
        </div>
        <div className='row'>
          <span>Country</span>
          <span>
            {hasBilling
              ? site.billing.country
              : '-'
            }
          </span>
        </div>
        <div className='row'>
          <span>VAT/GST Number</span>
          <span>-</span>
        </div>
        <h5>
          <Icon name='bank-card-2-line' />
          Invoices
        </h5>

        {!site.billing?.transactions?.length && (
          <p className='no-invoices'>No invoices</p>
        )}

        {site.billing?.transactions?.map(transaction => (
          <div className='row' key={transaction.id}>
            <span>
              <a href={transaction.invoiceWebUrl} target='_blank' rel='noreferrer'>
                {toddMMYYY(new Date(transaction.periodStartAt))}
              </a>
            </span>
            <span>
              <Pill className='secondary'>Paid</Pill>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
