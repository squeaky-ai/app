import React from 'react';
import type { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { useToasts } from 'hooks/use-toasts';
import { Currency } from 'types/graphql';
import type { Plan, Site, SubscriptionsCheckout } from 'types/graphql';

interface Props {
  site: Site;
  plan: Plan;
  loading: boolean;
  currency: Currency;
  setLoading: (loading: boolean) => void;
}

const MUTATION = gql`
  mutation SubscriptionsCreate($input: SubscriptionsCreateInput!) {
    subscriptionsCreate(input: $input) {
      customerId
      redirectUrl
    }
  }
`;

export const CheckoutButton: FC<Props> = ({ site, plan, loading, currency, setLoading }) => {
  const toasts = useToasts();

  const [checkout] = useMutation<{ subscriptionsCreate: SubscriptionsCheckout }>(MUTATION);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const { data } = await checkout({
        variables: {
          input: {
            siteId: site.id,
            pricingId: plan.pricing.find(p => p.currency === currency).id,
          }
        },
      });

      if (data) {
        location.href = data.subscriptionsCreate.redirectUrl;
      }
    } catch {
      toasts.add({ type: 'error', body: 'There was an error checking out' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type='button' onClick={handleCheckout} className='primary icon-left' disabled={loading}>
      <Icon name='lock-line' />
      {loading ? 'Loading...' : 'Proceed to checkout'}
    </Button>
  )
};
