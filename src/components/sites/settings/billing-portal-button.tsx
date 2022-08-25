import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { useToasts } from 'hooks/use-toasts';
import type { Site, SubscriptionsCheckout } from 'types/graphql';

interface Props {
  site: Site;
  message?: string;
  buttonClassName: string;
}

const MUTATION = gql`
  mutation SubscriptionsPortal($input: SubscriptionsPortalInput!) {
    subscriptionsPortal(input: $input) {
      redirectUrl
    }
  }
`;

export const BillingPortalButton: FC<Props> = ({ site, message, buttonClassName }) => {
  const toasts = useToasts();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [createPortal] = useMutation<{ subscriptionsPortal: SubscriptionsCheckout }>(MUTATION);

  const handlePortalRedirect = async () => {
    setLoading(true);
    
    try {
      const { data } = await createPortal({
        variables: {
          input: {
            siteId: site.id,
          }
        },
      });

      location.href = data.subscriptionsPortal.redirectUrl;
    } catch {
      toasts.add({ type: 'error', body: 'There was an error redirecting to the portal' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type='button' className={classnames(buttonClassName, 'external-link')} onClick={handlePortalRedirect} disabled={loading}>
      {loading && 'Loading...'}
      {!loading && (
        <>
          <span>{message || 'Update'}</span> <Icon name='external-link-line' />
        </>
      )}
    </Button>
  )
};
