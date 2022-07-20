import React from 'react';
import type { FC } from 'react';
import { startCase, last } from 'lodash';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { SiteEnterpriseUpgrade } from 'components/admin/site-enterprise-upgrade';
import { toddMMYYY } from 'lib/dates';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { toDecimalCurrency } from 'lib/currency';
import type { AdminSite } from 'types/graphql';
import { Message } from 'components/message';

interface Props {
  site: AdminSite;
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

        {site.plan?.tier > 0 && !hasBilling && (
          <Message
            type='warning'
            message='This site has been manually placed on a paid tier'
          />
        )}

        <div className='row'>
          <span>Plan</span>
          <span>
            {site.plan.name}

            {isEnterprise && latestTransaction && (
              <>: {CURRENCY_SYMBOLS[latestTransaction.currency]}{toDecimalCurrency(latestTransaction.amount)} per {latestTransaction.interval}</>
            )}

            {!isEnterprise && (
              <SiteEnterpriseUpgrade site={site} />
            )}
          </span>
        </div>
        {isEnterprise && (
          <div className='row'>
            <span>Coupons</span>
            <span>
              {hasBilling && latestTransaction?.discountName
                ? latestTransaction.discountPercentage
                    ? <span className='coupon'>{`${Number(latestTransaction.discountPercentage)}% ${latestTransaction.discountName}`}</span>
                    : <span className='coupon'>{CURRENCY_SYMBOLS[latestTransaction.currency]}{toDecimalCurrency(latestTransaction.discountAmount)}</span>
                : '-'
              }
            </span>
          </div>
        )}
        <div className='row'>
          <span>Customer ID</span>
          <span>{site.billing?.customerId || '-'}</span>
        </div>
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
