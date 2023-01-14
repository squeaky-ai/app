import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tag } from 'components/tag';
import { Checkout } from 'components/sites/settings/checkout';
import { CURRENCY_SYMBOLS } from 'data/common/constants';
import { Interval, getPricingForCurrencyAndInterval } from 'lib/currency';
import { Currency, DecoratedPlan, Site } from 'types/graphql';

interface Props {
  site: Site;
  currency: Currency;
  interval: Interval;
  hasBilling: boolean;
  plans: DecoratedPlan[];
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTableSmall: FC<Props> = ({ 
  site, 
  currency,
  interval,
  hasBilling,
  plans,
  showPlanChangeMessage,
}) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const planIndex = plans.findIndex(plan => plan.current);

  const toggleOpen = (name: string) => {
    setOpen(
      open.includes(name)
        ? open.filter(o => o !== name)
        : [...open, name]
    );
  };

  return (
    <div className='plan-table plan-table-small'>
      {plans.map((data, index) => {
        const isOpen = open.includes(data.name);
        const isDowngrade = index < planIndex;

        return (
          <div className={classnames('plan-row', data.name.toLowerCase(), { open: isOpen, show: data.show, current: data.current })} key={data.name}>
            <div role='button' className='button' onClick={() => toggleOpen(data.name)}>
              <div className='details'>
                <b>{data.name}</b>
                {interval === Interval.YEARLY && (
                  <Tag className='discount'>20% OFF</Tag>
                )}
                {data.plan?.deprecated && (
                  <Tag className='legacy'>LEGACY</Tag>
                )}
                <p className='pricing'>
                  {data?.plan
                    ? <><b>{CURRENCY_SYMBOLS[currency]}{getPricingForCurrencyAndInterval(data.plan, currency, interval)}</b> / {interval}</>
                    : <b>Let&apos;s talk</b>
                  }
                </p>
              </div>
              {data?.plan && (
                <Checkout 
                  site={site}
                  plan={data.plan}
                  currency={currency}
                  isCurrent={data.current} 
                  isDowngrade={isDowngrade}
                  isFirstTimeCheckout={!hasBilling}
                  showPlanChangeMessage={showPlanChangeMessage}
                />
              )}
              {!data.plan && (
                <a href='/contact-us' className='button primary' target='_blank'>
                  Book a call
                </a>
              )}
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
    </div>
  );
};
