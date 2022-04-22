import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Container } from 'components/container';
import { Select, Option } from 'components/select';
import { BillingPlansTableSmall } from 'components/sites/settings/billing-plans-table-small';
import { BillingPlansTableLarge } from 'components/sites/settings/billing-plans-table-large';
import { getUsefulCurrency } from 'lib/currency';
import { PlansCurrency, Site } from 'types/graphql';
import type { Billing } from 'types/billing';


interface Props {
  site: Site;
  billing: Billing;
  hasBilling: boolean;
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTable: FC<Props> = ({ site, billing, hasBilling, showPlanChangeMessage }) => {
  const [currency, setCurrency] = React.useState<PlansCurrency>(getUsefulCurrency());

  const planIndex = billing.plans.findIndex(plan => Number(plan.id) === site.plan.tier);

  // If they have transactions we do two things:
  // a) we set the currency to the currency that they have in their billing
  // b) we hide the currency change select
  // This is because we don't want to be changing the currency without
  // changing the payment method. If this comes up they can remove their
  // payment method and add a new one.
  const hasTransactions = billing.billing?.transactions?.length;

  const onCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCurrency(value as PlansCurrency);
  };

  React.useEffect(() => {
    if (hasTransactions) {
      // They should see the table in the currency they're already using
      setCurrency(billing.billing.transactions[0].currency);
    }
  }, [billing.billing]);

  return (
    <>
      <div className='currencies'>
        <Container className='md'>
          <p>All plans come with access to our entire range of customer experience products, including analytics, recordings, feedback and heatmap data. To learn more about our full array of features, <Link href='/features'><a target='_blank'>see here</a></Link>.</p>
        </Container>

        {!hasTransactions && (
          <div className='currency-select'>
            <Label htmlFor='currency'>Currency</Label>
            <Select name='currency' value={currency} onChange={onCurrencyChange}>
              <Option value={PlansCurrency.Eur}>Euro (€)</Option>
              <Option value={PlansCurrency.Gbp}>GBP (£)</Option>
              <Option value={PlansCurrency.Usd}>USD ($)</Option>
            </Select>
          </div>
        )}
      </div>

      <BillingPlansTableSmall
        site={site}
        billing={billing}
        planIndex={planIndex}
        currency={currency}
        hasBilling={hasBilling}
        showPlanChangeMessage={showPlanChangeMessage}
      />

      <BillingPlansTableLarge 
        site={site}
        billing={billing}
        planIndex={planIndex}
        currency={currency}
        hasBilling={hasBilling}
        showPlanChangeMessage={showPlanChangeMessage}
      />
 
      <div className='enterprise'>
        <Icon name='building-line' />
        <p>If you have <b>more than 200k visits per month</b>, or you&apos;re looking to <b>learn more about our Enterprise features</b>, like SSO, Audit Trails, Enterprise SLA&apos;s etc, the please get in touch.</p>
        <Button className='primary'>
          Discuss Enterprise Plans
        </Button>
      </div>
    </>
  );
};
