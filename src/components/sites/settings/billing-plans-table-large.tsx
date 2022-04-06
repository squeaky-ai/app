import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Checkout } from 'components/sites/settings/checkout';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { getPricingForCurrency } from 'lib/currency';
import { PlansCurrency, Site } from 'types/graphql';
import type { Billing } from 'types/billing';

interface Props {
  site: Site;
  billing: Billing;
  planIndex: number;
  currency: PlansCurrency;
  hasBilling: boolean;
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTableLarge: FC<Props> = ({ 
  site, 
  billing, 
  planIndex, 
  currency,
  hasBilling,
  showPlanChangeMessage,
}) => {
  return (
    <div className='plan-table-large'>
      <div className='col y-labels'>
        <div className='cell head blank'></div>
        <div className='cell'>
          <b>Visits per month</b>
        </div>
        <div className='cell'>
          <b>Team members</b>
        </div>
        <div className='cell'>
          <b>Recordings</b>
        </div>
        <div className='cell'>
          <b>Visitor profiles</b>
        </div>
        <div className='cell'>
          <b>Analytics</b>
        </div>
        <div className='cell'>
          <b>Feedback</b>
        </div>
        <div className='cell'>
          <b>Heatmaps</b>
        </div>
        <div className='cell'>
          <b>Data storage</b>
        </div>
        <div className='cell'>
          <b>Support type</b>
        </div>
        <div className='cell'>
          <b>Response times</b>
        </div>
      </div>
      {billing.plans.slice(0, billing.plans.length - 1).map((plan, index) => {
        const isCurrent = index === planIndex;
        const isDowngrade = index < planIndex;

        return (
          <div className={classnames('col', { current: isCurrent })} key={plan.name}>
            <div className='cell head'>
              <p>
                <b>{plan.name}</b>
              </p>
              <p className='pricing'>
                <b>{CURRENCY_SYMBOLS[currency]}{getPricingForCurrency(plan, currency)}</b> per month
              </p>
              <Checkout 
                site={site}
                plan={plan}
                currency={currency}
                isCurrent={isCurrent} 
                isDowngrade={isDowngrade}
                isFirstTimeCheckout={!hasBilling}
                showPlanChangeMessage={showPlanChangeMessage}
              />
            </div>
            <div className='cell'>
              Up to <b>{plan.maxMonthlyRecordings.toLocaleString()}</b>
            </div>
            <div className='cell'>
              Unlimited
            </div>
            <div className='cell'>
              <Icon name='check-line' />
            </div>
            <div className='cell'>
              <Icon name='check-line' />
            </div>
            <div className='cell'>
              <Icon name='check-line' />
            </div>
            <div className='cell'>
              <Icon name='check-line' />
            </div>
            <div className='cell'>
              <Icon name='check-line' />
            </div>
            <div className='cell'>
              {plan.dataStorageMonths >= 12 
                ? `${plan.dataStorageMonths / 12} year` 
                : `${plan.dataStorageMonths} months`
              }
            </div>
            <div className='cell'>
              {plan.support.join(' & ')}
            </div>
            <div className='cell'>
              {plan.responseTimeHours > 24
                ? <>Max. <b>{plan.responseTimeHours / 24} days</b></>
                : <>Max. <b>{plan.responseTimeHours} hours</b></>
              }
            </div>
          </div>
        )
      })}
    </div>
  );
};
