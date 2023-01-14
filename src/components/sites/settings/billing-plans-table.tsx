import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Select, Option } from 'components/select';
import { BillingPlansTableSmall } from 'components/sites/settings/billing-plans-table-small';
import { BillingPlansTableLarge } from 'components/sites/settings/billing-plans-table-large';
import { Interval, getUsefulCurrency } from 'lib/currency';
import { Currency, Site } from 'types/graphql';
import type { Billing } from 'types/billing';


interface Props {
  site: Site;
  billing: Billing;
  hasBilling: boolean;
  showPlanChangeMessage: (name: string) => void;
}

export const BillingPlansTable: FC<Props> = ({ site, billing, hasBilling, showPlanChangeMessage }) => {
  const [currency, setCurrency] = React.useState<Currency>(getUsefulCurrency());
  const [interval, setInterval] = React.useState<Interval>(Interval.MONTHLY);

  // If they have transactions we do two things:
  // a) we set the currency to the currency that they have in their billing
  // b) we hide the currency change select
  // This is because we don't want to be changing the currency without
  // changing the payment method. If this comes up they can remove their
  // payment method and add a new one.
  const hasTransactions = billing.billing?.transactions?.length;

  const onCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCurrency(value as Currency);
  };

  const onIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setInterval(value as Interval);
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
          <p>All plans come with access to our entire range of customer experience products, including analytics, recordings, feedback and heatmap data. To learn more about our full array of features, <a href='/features' target='_blank'>see here</a>.</p>
        </Container>

        {!hasTransactions && (
          <div className='options'>
            <div className='currency-select'>
              <Select name='currency' value={currency} onChange={onCurrencyChange}>
                <Option value={Currency.Eur}>Euro (€)</Option>
                <Option value={Currency.Gbp}>GBP (£)</Option>
                <Option value={Currency.Usd}>USD ($)</Option>
              </Select>
            </div>
            <div className='interval-select'>
              <Select name='interval' value={interval} onChange={onIntervalChange}>
                <Option value={Interval.MONTHLY}>Pay monthly</Option>
                <Option value={Interval.YEARLY}>Pay yearly -20%</Option>
              </Select>
            </div>
          </div>
        )}
      </div>

      <BillingPlansTableSmall
        site={site}
        currency={currency}
        interval={interval}
        hasBilling={hasBilling}
        plans={billing.plans}
        showPlanChangeMessage={showPlanChangeMessage}
      />

      <BillingPlansTableLarge 
        site={site}
        currency={currency}
        interval={interval}
        hasBilling={hasBilling}
        plans={billing.plans}
        showPlanChangeMessage={showPlanChangeMessage}
      />
    </>
  );
};
