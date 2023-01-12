import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Tag } from 'components/tag';
import { Card } from 'components/card';
import { Checkout } from 'components/sites/settings/checkout';
import { getPricingForCurrencyAndInterval, Interval } from 'lib/currency';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Currency, Site } from 'types/graphql';
import type { PlanData } from 'types/billing';

interface Props {
  site: Site;
  currency: Currency;
  interval: Interval;
  hasBilling: boolean;
  planData: PlanData[];
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTableLarge: FC<Props> = ({ 
  site,
  currency,
  interval,
  hasBilling,
  planData,
  showPlanChangeMessage,
}) => {
  const planIndex = planData.findIndex(plan => plan.current);

  const isDowngrade = (index: number) => index < planIndex;

  return (
    <div className='plan-table plan-table-large'>
      {planData.map((data, index) => (
        <Card className={classnames('col', { current: data.current, show: data.show, deprecated: data.plan.deprecated })} key={data.plan.name}>
          <h5 className='plan-name'>
            <b>{data.plan.name}</b>
            {interval === Interval.YEARLY && (
              <Tag className='discount'>20% OFF</Tag>
            )}
            {data.plan.deprecated && (
              <Tag className='legacy'>LEGACY</Tag>
            )}
          </h5>
          <p className='pricing'>
            <b>{CURRENCY_SYMBOLS[currency]}{getPricingForCurrencyAndInterval(data.plan, currency, interval)}</b> / {interval}
          </p>
          <Checkout
            site={site}
            plan={data.plan}
            currency={currency}
            isCurrent={data.current} 
            isDowngrade={isDowngrade(index)}
            isFirstTimeCheckout={!hasBilling}
            showPlanChangeMessage={showPlanChangeMessage}
          />
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

      <Card className='col show enterprise'>
        <h5 className='plan-name'>
          <b>Enterprise</b>
        </h5>
        <p className='pricing'><b>Let's talk</b></p>
        <a href='/contact-us' className='button primary' target='_blank'>
          Book a call
        </a>
        <div className='features'>
          <p className='category'>Usage</p>
          <p className='small'>Custom visits per month</p>
          <p className='small'>Unlimited team members</p>
          <p className='small'>Unlimited websites</p>
          <p className='small'>Custom data retention</p>
          <p className='category'>Capabilities</p>
          <p className='includes small'>All features, plus the following upgrades and extras:</p>
          <p className='small'>Custom surveys <span>(Unlimited)</span></p>
          <p className='small'>Segments <span>(Unlimited)</span></p>
          <p className='category'>Options</p>
          <p className='small'>Single Sign-On (SSO)</p>
          <p className='small'>Audit Trail</p>
          <p className='small'>Private Instance</p>
          <p className='small'>Enterprise SLA&apos;s</p>
        </div>
      </Card>
    </div>
  );
};
