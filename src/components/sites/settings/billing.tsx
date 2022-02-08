import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useBilling } from 'hooks/use-billing';
import { Spinner } from 'components/spinner';
import { Tabs } from 'components/tabs';
import { Preferences, Preference } from 'lib/preferences';
import { BillingTable } from 'components/sites/settings/billing-table';
import { BillingPlansTable } from 'components/sites/settings/billing-plans.table';
import { PlanChanged } from 'components/sites/settings/plan-changed';
import { PlansCurrency } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Billing: FC<Props> = ({ site }) => {
  const ref = React.useRef<PlanChanged>(null);

  const router = useRouter();

  const { loading, billing } = useBilling();

  const [currency, setCurrency] = React.useState<PlansCurrency>(PlansCurrency.Eur);

  const showPlanChangeMessage = (name: string) => {
    if (ref.current) ref.current.show(name);
  };

  React.useEffect(() => {
    const cur = Preferences.getString(Preference.CURRENCY);
    if (cur) setCurrency(cur as PlansCurrency);

    if (router.query.success) {
      showPlanChangeMessage(site.plan.name);
      router.replace(router.asPath.replace('?success=1', ''), undefined, { shallow: true });
    }
  }, []);

  // It could either:
  // - not exist (they've never checked out)
  // - be new (as they clicked this button before but didn't actually make it through)
  const hasBilling = ![undefined, 'new'].includes(billing.billing?.status);

  return (
    <>
      {loading && <Spinner />}

      {!loading && (
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
                    showPlanChangeMessage={showPlanChangeMessage}
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
      )}

      <PlanChanged ref={ref} />
    </>
  );
};
