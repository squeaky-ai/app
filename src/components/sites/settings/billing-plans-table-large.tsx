import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Tag } from 'components/tag';
import { Card } from 'components/card';
import { Checkout } from 'components/sites/settings/checkout';
import { getPricingForCurrencyAndInterval, Interval } from 'lib/currency';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Currency, DecoratedPlan, Site } from 'types/graphql';

interface Props {
  site: Site;
  currency: Currency;
  interval: Interval;
  hasBilling: boolean;
  plans: DecoratedPlan[];
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTableLarge: FC<Props> = ({ 
  site,
  currency,
  interval,
  hasBilling,
  plans,
  showPlanChangeMessage,
}) => {
  const planIndex = plans.findIndex(plan => plan.current);

  const isDowngrade = (index: number) => index < planIndex;

  return (
    <div className='plan-table plan-table-large'>
      {plans.map((data, index) => (
        <Card className={classnames('col', data.name.toLowerCase(), { current: data.current, show: data.show, deprecated: data.plan?.deprecated })} key={data.name}>
          <h5 className='plan-name'>
            <b>{data.name}</b>
            {interval === Interval.YEARLY && (
              <Tag className='discount'>20% OFF</Tag>
            )}
            {data.plan?.deprecated && (
              <Tag className='legacy'>LEGACY</Tag>
            )}
          </h5>
          <p className='pricing'>
            {data?.plan
              ? <><b>{CURRENCY_SYMBOLS[currency]}{getPricingForCurrencyAndInterval(data.plan, currency, interval)}</b> / {interval}</>
              : <b>Let&apos;s talk</b>
            }
          </p>
          {data?.plan && (
            <Checkout
              site={site}
              plan={data.plan}
              currency={currency}
              isCurrent={data.current} 
              isDowngrade={isDowngrade(index)}
              isFirstTimeCheckout={!hasBilling}
              showPlanChangeMessage={showPlanChangeMessage}
            />
          )}
          {!data.plan && (
            <a href='/contact-us' className='button primary' target='_blank'>
              Book a call
            </a>
          )}
          <div className='features'>
            {data.usage.length > 0 && (
              <>
                <p className='category'>Usage</p>
                {data.usage.map(u => (
                  <p className='small' key={u}>{u}</p>
                ))}
              </>
            )}
            {data.capabilities.length > 0 && (
              <>
                <p className='category'>Capabilities</p>
                {data.includesCapabilitiesFrom && (
                  <p className='small includes'>
                    Everything in {data.includesCapabilitiesFrom}, plus the following upgrades and extras:
                  </p>
                )}
                {data.capabilities.map(c => (
                  <p className='small' key={c}>{c}</p>
                ))}
              </>
            )}
            {data.options.length > 0 && (
              <>
                <p className='category'>Options</p>
                {data.options.map(o => (
                  <p className='small' key={o}>{o}</p>
                ))}
              </>
            )}
          </div>
          <div className='deprecation-notice'>
            <p className='small'>
              You are currently on a legacy pricing plan. We will honour your plan in perpetuity, until you choose to change plan or your payment details expire.
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
