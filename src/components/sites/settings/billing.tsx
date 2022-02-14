import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useBilling } from 'hooks/use-billing';
import { Spinner } from 'components/spinner';
import { Tabs } from 'components/tabs';
import { BillingTable } from 'components/sites/settings/billing-table';
import { BillingPlansTable } from 'components/sites/settings/billing-plans.table';
import { PlanChanged } from 'components/sites/settings/plan-changed';
import { BillingPortalButton } from 'components/sites/settings/billing-portal-button';
import { Message } from 'components/message';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Billing: FC<Props> = ({ site }) => {
  const ref = React.useRef<PlanChanged>(null);

  const router = useRouter();
  const toasts = useToasts();

  const { loading, billing } = useBilling();

  const showPlanChangeMessage = (name: string) => {
    if (ref.current) ref.current.show(name);
  };

  const removeQueryParams = () => {
    router.replace(router.asPath.split('?')[0], undefined, { shallow: true });
  };

  React.useEffect(() => {
    if (router.query.billing_setup_success === '1') {
      showPlanChangeMessage(site.plan.name);
      removeQueryParams();
    }

    if (router.query.billing_setup_success === '0') {
      toasts.add({ type: 'error', body: 'There was an issue setting up billing, please contact support' });
      removeQueryParams();
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
          {!site.plan.billingValid && (
            <Message
              type='error'
              message={<p><b>Attention</b>: We had trouble processing your subscription using your chosen payment method. You've been temporarily placed on the free plan. To restore your subscription and unlock your missing data, please update your payment details.</p>}
              button={<BillingPortalButton site={site} message='Manage billing' buttonClassName='primary' />}
            />
          )}

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
