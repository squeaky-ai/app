import React from 'react';
import type { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { useToasts } from 'hooks/use-toasts';
import { PlansCurrency } from 'types/graphql';
import type { Plan, Site, SiteBilling } from 'types/graphql';

interface Props {
  site: Site;
  plan: Plan;
  label: string;
  loading: boolean;
  currency: PlansCurrency;
  buttonClassName: string;
  setLoading: (loading: boolean) => void;
  onChange: (name: string) => void;
}

const MUTATION = gql`
  mutation SubscriptionsUpdate($input: SubscriptionsUpdateInput!) {
    subscriptionsUpdate(input: $input) {
      id
      plan {
        name
        tier
      }
    }
  }
`;

export const ChangePlanButton: FC<Props> = ({ site, plan, label, loading, currency, buttonClassName, setLoading, onChange }) => {
  const toasts = useToasts();

  const [changePlan] = useMutation<{ subscriptionsUpdate: SiteBilling }>(MUTATION);

  const handleChangePlan = async () => {
    setLoading(true);
    
    try {
      await changePlan({
        variables: {
          input: {
            siteId: site.id,
            pricingId: plan.pricing.find(p => p.currency === currency).id,
          }
        },
      });

      onChange(plan.name);
    } catch {
      toasts.add({ type: 'error', body: 'There was an error checking out' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type='button' onClick={handleChangePlan} className={buttonClassName} disabled={loading}>
      {loading ? 'Loading...' : label}
    </Button>
  )
};
