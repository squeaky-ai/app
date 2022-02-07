import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useBilling } from 'hooks/use-billing';
import { Spinner } from 'components/spinner';
import { Tabs } from 'components/tabs';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Container } from 'components/container';
import { Checkout } from 'components/sites/settings/checkout';
import { Select, Option } from 'components/select';
import { Label } from 'components/label';
import { PlansCurrency } from 'types/graphql';
import type { Plan, Site } from 'types/graphql';

interface Props {
  site: Site;
}

const getPricingForCurrency = (plan: Plan, currency: PlansCurrency) => {
  return (plan.pricing || []).find(p => p.currency === currency)?.amount || 0;
};

export const Billing: FC<Props> = ({ site }) => {
  const { loading, billing } = useBilling();

  const [currency, setCurrency] = React.useState<PlansCurrency>(PlansCurrency.Eur);

  if (loading) {
    return <Spinner />;
  }

  // It could either:
  // - not exist (they've never checked out)
  // - be new (as they clicked this button before but didn't actually make it through)
  const isFirstTimeCheckout = [undefined, 'new'].includes(billing.billing?.status);
  const planIndex = billing.plans.findIndex(plan => Number(plan.id) === site.plan.type);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCurrency(value as PlansCurrency);
  };

  return (
    <div className='billing'>
      <Tabs
        tabs={[
          {
            name: 'Plans',
            page: 'plans',
            body: (
              <>
                <Container className='md'>
                  <p>All plans come with access to our entire range of customer experience products, including analytics, recordings, feedback and heatmap data. To learn more about our full array of features, <Link href='/features'><a target='_blank'>see here</a></Link>.</p>
                </Container>

                <div className='currency-select'>
                  <Label htmlFor='currency'>Currency</Label>
                  <Select name='currency' value={currency} onChange={handleCurrencyChange}>
                    <Option value={PlansCurrency.Eur}>Euro</Option>
                    <Option value={PlansCurrency.Gbp}>Pound</Option>
                    <Option value={PlansCurrency.Usd}>Dollar</Option>
                  </Select>
                </div>

                <div className='plan-table'>
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
                            <b>${getPricingForCurrency(plan, currency)}</b> per month
                          </p>
                          <Checkout 
                            site={site}
                            plan={plan}
                            currency={currency}
                            isCurrent={isCurrent} 
                            isDowngrade={isDowngrade}
                            isFirstTimeCheckout={isFirstTimeCheckout}
                          />
                        </div>
                        <div className='cell'>
                          Up to <b>{plan.maxMonthlyRecordings.toLocaleString()}</b>
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

                <div className='enterprise'>
                  <Icon name='building-line' />
                  <p>If you have <b>more than 100k visits per month</b>, or you&apos;re looking to <b>learn more about our Enterprise features</b>, like SSO, Audit Trails, Enterprise SLA&apos;s etc, the please get in touch.</p>
                  <Button className='primary'>
                    Discuss Enterprise Plans
                  </Button>
                </div>
             </>
            )
          },
          {
            name: 'Billing',
            page: 'billing',
            body: (
              <>
                <p>🙀</p>
              </>
            )
          }
        ]}
      />
    </div>
  );
};
