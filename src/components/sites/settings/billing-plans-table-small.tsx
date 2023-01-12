import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tag } from 'components/tag';
import { Checkout } from 'components/sites/settings/checkout';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Interval, getPricingForCurrencyAndInterval } from 'lib/currency';
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

export const BillingPlansTableSmall: FC<Props> = ({ 
  site, 
  currency,
  interval,
  hasBilling,
  planData,
  showPlanChangeMessage,
}) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const planIndex = planData.findIndex(plan => plan.current);

  const toggleOpen = (name: string) => {
    setOpen(
      open.includes(name)
        ? open.filter(o => o !== name)
        : [...open, name]
    );
  };

  return (
    <div className='plan-table plan-table-small'>
      {planData.map((data, index) => {
        const isOpen = open.includes(data.name);
        const isDowngrade = index < planIndex;

        return (
          <div className={classnames('plan-row', { open: isOpen, show: data.show, current: data.current })} key={data.plan.id}>
            <div role='button' className='button' onClick={() => toggleOpen(data.plan.name)}>
              <div className='details'>
                <b>{data.plan.name}</b>
                {interval === Interval.YEARLY && (
                  <Tag className='discount'>20% OFF</Tag>
                )}
                {data.plan.deprecated && (
                  <Tag className='legacy'>LEGACY</Tag>
                )}
                <p className='pricing'>
                  <b>{CURRENCY_SYMBOLS[currency]}{getPricingForCurrencyAndInterval(data.plan, currency, interval)}</b> per {interval}
                </p>
              </div>
              <Checkout 
                site={site}
                plan={data.plan}
                currency={currency}
                isCurrent={data.current} 
                isDowngrade={isDowngrade}
                isFirstTimeCheckout={!hasBilling}
                showPlanChangeMessage={showPlanChangeMessage}
              />
              <Icon className='arrow' name='arrow-down-s-line' />
            </div>
            {isOpen && (
              <div className='body'>
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
              </div>
            )}
          </div>
        );
      })}

      <div className={classnames('plan-row show', { open: open.includes('enterprise') })}>
        <div role='button' className='button' onClick={() => toggleOpen('enterprise')}>
          <div className='details'>
            <b>Enterprise</b>
            <p className='pricing'>
              <b>Let's Talk</b>
            </p>
          </div>
          <a href='/contact-us' className='button primary' target='_blank'>
            Book a call
          </a>
          <Icon className='arrow' name='arrow-down-s-line' />
        </div>
        {open.includes('enterprise') && (
          <div className='body'>
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
        )}
      </div>
    </div>
  );
};
