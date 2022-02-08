import React from 'react';
import type { FC } from 'react';
import { useBilling } from 'hooks/use-billing';
import { Spinner } from 'components/spinner';
import { Tabs } from 'components/tabs';
import { Preferences, Preference } from 'lib/preferences';
import { BillingTable } from 'components/sites/settings/billing-table';
import { BillingPlansTable } from 'components/sites/settings/billing-plans.table';
import { PlansCurrency } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Billing: FC<Props> = ({ site }) => {
  const { loading, billing } = useBilling();

  const [currency, setCurrency] = React.useState<PlansCurrency>(PlansCurrency.Eur);

  React.useEffect(() => {
    const cur = Preferences.getString(Preference.CURRENCY);
    if (cur) setCurrency(cur as PlansCurrency);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // It could either:
  // - not exist (they've never checked out)
  // - be new (as they clicked this button before but didn't actually make it through)
  const hasBilling = ![undefined, 'new'].includes(billing.billing?.status);

  return (
    <div className='billing'>
      <Tabs
        tabs={[
          {
            name: 'Plans',
            page: 'plans',
            body: (
              <BillingPlansTable 
                site={site}
                billing={billing} 
                hasBilling={hasBilling}
                currency={currency}
                handleCurrencyChange={setCurrency}
              />
            )
          },
          {
            name: 'Billing',
            page: 'billing',
            body: (
              <BillingTable 
                site={site}
                billing={billing} 
                hasBilling={hasBilling} 
                currency={currency}
              />
            )
          }
        ]}
      />
    </div>
  );
};
