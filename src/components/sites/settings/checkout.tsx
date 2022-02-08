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

  const isUpgrading = !isFirstTimeCheckout && !isDowngrade;
  const isDowngrading = !isFirstTimeCheckout && isDowngrade;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [checkout] = useMutation<{ subscriptionsCreate: SubscriptionsCheckout }>(MUTATION);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

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
    }
  };

  const handlePlanChange = () => {
    console.log(plan);
  };

  return (
    <>
      <Button className={isDowngrade ? 'quaternary' : 'primary'} disabled={isCurrent || loading} onClick={openModal}>
        {isCurrent
          ? 'Current Plan'
          : isDowngrade ? 'Downgrade' : 'Upgrade'
        }
      </Button>

      <Modal ref={ref} className='sm'>
        <ModalBody aria-labelledby='checkout-confirm-title'>
          <ModalHeader>
            {isFirstTimeCheckout && (
              <p id='checkout-confirm-title'><b>Proceed to checkout</b></p>
            )}

            {isDowngrading && (
              <p id='checkout-confirm-title'><b>Downgrade confirmation</b></p>
            )}

            {isUpgrading && (
              <p id='checkout-confirm-title'><b>Upgrade confirmation</b></p>
            )}

            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            {isFirstTimeCheckout && (
              <>
                <p>To upgrade to the {plan.name} plan and capture up to {plan.maxMonthlyRecordings.toLocaleString()} visits per month, please click the button and you&apos;ll be redirected to our secure checkout page.</p>
                <p className='small'><b>Note</b>: Discount codes can be applied at checkout</p>
              </>
            )}

            {isDowngrading && (
              <>
                <p>Are you sure you wish to downgrade to the {plan.name} plan and be limited to {plan.maxMonthlyRecordings.toLocaleString()} visits per month?</p>
              </>
            )}

            {isUpgrading && (
              <>
                <p>To confirm your upgrade to the {plan.name} plan and capture up to {plan.maxMonthlyRecordings.toLocaleString()} visits per month, please click the button below.</p>
                <p className='small'><b>Note</b>: Your billing schedule will change to today&apos;s date. If you have any remaining days from your old plan this will be deducted from your first new payment on a pro rata basis.</p>
              </>
            )}
          </ModalContents>
          <ModalFooter>
            {isFirstTimeCheckout && (
              <Button type='button' onClick={handleCheckout} className='primary icon-left' disabled={loading}>
                <Icon name='lock-line' />
                {loading ? 'Loading...' : 'Proceed to checkout'}
              </Button>
            )}

            {isDowngrading && (
              <Button type='button' onClick={handlePlanChange} className='tertiary' disabled={loading}>
                {loading ? 'Loading...' : 'Downgrade plan'}
              </Button>
            )}

            {isUpgrading && (
              <Button type='button' onClick={handlePlanChange} className='primary' disabled={loading}>
                {loading ? 'Loading...' : 'Upgrade plan'}
              </Button>
            )}

            <Button type='button' className='quaternary' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
