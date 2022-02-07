import React from 'react';
import type { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { Plan, PlansCurrency, Site, SubscriptionsCheckout } from 'types/graphql';

interface Props {
  site: Site;
  plan: Plan;
  currency: PlansCurrency;
  isCurrent: boolean;
  isDowngrade: boolean;
  isFirstTimeCheckout: boolean;
}

const MUTATION = gql`
  mutation SubscriptionsCreate($input: SubscriptionsCreateInput!) {
    subscriptionsCreate(input: $input) {
      customerId
      redirectUrl
    }
  }
`;

export const Checkout: FC<Props> = ({ site, plan, currency, isCurrent, isDowngrade, isFirstTimeCheckout }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [checkout] = useMutation<{ subscriptionsCreate: SubscriptionsCheckout }>(MUTATION);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleCheckoutButton = () => {
    if (!isFirstTimeCheckout) {
      return openModal();
    }

    setLoading(true);
    handleFirstTimeCheckoutRedirect();
  };

  const handleFirstTimeCheckoutRedirect = async () => {
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
    }
  };

  return (
    <>
      <Button className={isDowngrade ? 'quaternary' : 'primary'} disabled={isCurrent || loading} onClick={handleCheckoutButton}>
        {loading 
          ? 'Loading...' 
          : isCurrent
            ? 'Current Plan'
            : isDowngrade ? 'Downgrade' : 'Upgrade'
        }
      </Button>

      <Modal ref={ref} className='sm'>
        <ModalBody aria-labelledby='checkout-confirm-title' aria-describedby='checkout-confirm-description'>
          <ModalHeader>
            <p id='checkout-confirm-title'><b>Checkout</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='checkout-confirm-description'>Yer gonna change plans yeah?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' onClick={console.log} className='primary'>
              Change plans 
            </Button>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
