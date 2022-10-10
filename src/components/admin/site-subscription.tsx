import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { startCase, last } from 'lodash';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { SiteEnterpriseUpgrade } from 'components/admin/site-enterprise-upgrade';
import { toddMMYYY } from 'lib/dates';
import { Card } from 'components/card';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Message } from 'components/message';
import { toDecimalCurrency } from 'lib/currency';
import type { AdminSite, SitesBillingAddress } from 'types/graphql';

interface Props {
  site: AdminSite;
  isEnterprise: boolean;
  hasBilling: boolean;
}

const addressFields: Array<keyof SitesBillingAddress> = ['line1', 'line2', 'city', 'state', 'postalCode', 'country'];

export const SiteSubscription: FC<Props> = ({ site, isEnterprise, hasBilling }) => {
  const latestTransaction = last(site?.billing?.transactions);

  return (
    <div className='subscription'>
      <Card>
        <div className='title'>
          <h5>
            <Icon name='price-tag-3-line' />
            Subscription
          </h5>
          {hasBilling && (
            <a className='button stripe-link external-link' href={`https://dashboard.stripe.com/test/customers/${site.billing.customerId}`} target='_blank' rel='noreferrer'>
              <Icon name='external-link-line' /> <span>Stripe</span>
            </a>
          )}
        </div>

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
        <div className={classnames('row address', { 'has-address': hasBilling && site.billing?.billingAddress })}>
          <span>Address</span>
          <span>
            {hasBilling && site.billing?.billingAddress
              ? addressFields.map((x, i) => {
                  const value = site.billing.billingAddress[x];
                  return <span key={i}>{value ? <>{value}<br /></> : null}</span>
                })
              : '-'
            }
          </span>
        </div>
        <div className='row'>
          <span>VAT/GST Number</span>
          <span>
            {hasBilling
              ? site.billing.taxIds.map(t => t.value).join(', ')
              : '-'
            }
          </span>
        </div>
      </Card>

      <Card>
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
      </Card>

      <Card>
        <h5>
          <Icon name='bubble-chart-line' />
          Bundled with
        </h5>
        <div className='row'>
          <span>Sites</span>
          <span>
            {site.bundledWith.filter(s => s.id !== site.id).map(site => (
              <Link key={site.id} href={`/__admin/sites/${site.id}`}>
                <a>{site.name}</a>
              </Link>
            ))}
          </span>
        </div>
      </Card>
    </div>
  );
};
