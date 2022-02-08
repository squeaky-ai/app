import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
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
}

const MUTATION = gql`
  mutation SubscriptionsUpdate($input: SubscriptionsUpdateInput!) {
    subscriptionsUpdate(input: $input) {
      id
    }
  }
`;

export const ChangePlanButton: FC<Props> = ({ site, plan, label, loading, currency, buttonClassName, setLoading }) => {
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
    } catch {
      toasts.add({ type: 'error', body: 'There was an error checking out' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type='button' onClick={handleChangePlan} className={classnames(buttonClassName, 'icon-left')} disabled={loading}>
      <Icon name='lock-line' />
      {loading ? 'Loading...' : label}
    </Button>
  )
};
