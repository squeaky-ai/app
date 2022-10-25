import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Checkout } from 'components/sites/settings/checkout';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Interval, getPricingForCurrencyAndInterval } from 'lib/currency';
import { Currency, Site } from 'types/graphql';
import type { Billing } from 'types/billing';

interface Props {
  site: Site;
  billing: Billing;
  planIndex: number;
  currency: Currency;
  interval: Interval;
  hasBilling: boolean;
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTableSmall: FC<Props> = ({ 
  site, 
  billing, 
  planIndex, 
  currency,
  interval,
  hasBilling,
  showPlanChangeMessage,
}) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const toggleOpen = (name: string) => {
    setOpen(
      open.includes(name)
        ? open.filter(o => o !== name)
        : [...open, name]
    );
  };

  return (
    <div className='plan-table-small'>
      {billing.plans.slice(0, 5).map((plan, index) => {
        const isOpen = open.includes(plan.name);
        const isCurrent = index === planIndex;
        const isDowngrade = index < planIndex;

        return (
          <div className={classnames('plan-row', { open: isOpen, current: isCurrent })} key={plan.id}>
            <div role='button' className='button' onClick={() => toggleOpen(plan.name)}>
              <div className='details'>
                <b>{plan.name}</b>
                <p className='pricing'>
                  <b>{CURRENCY_SYMBOLS[currency]}{getPricingForCurrencyAndInterval(plan, currency, interval)}</b> per {interval}
                </p>
              </div>
              <Checkout 
                site={site}
                plan={plan}
                currency={currency}
                isCurrent={isCurrent} 
                isDowngrade={isDowngrade}
                isFirstTimeCheckout={!hasBilling}
                showPlanChangeMessage={showPlanChangeMessage}
              />
              <Icon className='arrow' name='arrow-down-s-line' />
            </div>
            {isOpen && (
              <div className='body'>
                <p>Up to <b>{plan.maxMonthlyRecordings.toLocaleString()}</b></p>
                <p>Unlimited team members</p>
                <p>Recordings</p>
                <p>Visitor profiles</p>
                <p>Analytics</p>
                <p>Feedback</p>
                <p>Heatmaps</p>
                <p>{plan.dataStorageMonths >= 12 ? `${plan.dataStorageMonths / 12} year` : `${plan.dataStorageMonths} months`} data storage</p>
                <p>{plan.support.join(' & ')} support</p>
                <p>{plan.responseTimeHours > 24 ? <>Max. <b>{plan.responseTimeHours / 24} days</b></> : <>Max. <b>{plan.responseTimeHours} hours</b></>} response time</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
