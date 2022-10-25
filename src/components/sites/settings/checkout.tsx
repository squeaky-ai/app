import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Plan, Currency, Site } from 'types/graphql';
import { CheckoutButton } from 'components/sites/settings/checkout-button';
import { ChangePlanButton } from 'components/sites/settings/change-plan-button';

interface Props {
  site: Site;
  plan: Plan;
  currency: Currency;
  isCurrent: boolean;
  isDowngrade: boolean;
  isFirstTimeCheckout: boolean;
  showPlanChangeMessage: (name: string) => void;
}

export const Checkout: FC<Props> = ({ site, plan, currency, isCurrent, isDowngrade, isFirstTimeCheckout, showPlanChangeMessage }) => {
  const ref = React.useRef<Modal>();

  const isUpgrading = !isFirstTimeCheckout && !isDowngrade;
  const isDowngrading = !isFirstTimeCheckout && isDowngrade;

  const [loading, setLoading] = React.useState<boolean>(false);

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const onPlanChange = (name: string) => {
    closeModal();
    showPlanChangeMessage(name);
  };

  return (
    <>
      <Button className={isDowngrade ? 'quaternary' : 'primary'} disabled={isCurrent} onClick={openModal}>
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
              <CheckoutButton
                site={site}
                plan={plan}
                loading={loading}
                currency={currency}
                setLoading={setLoading}
              />
            )}

            {isDowngrading && (
              <ChangePlanButton
                site={site}
                plan={plan}
                loading={loading}
                currency={currency}
                label='Downgrade plan'
                buttonClassName='tertiary'
                setLoading={setLoading}
                onChange={onPlanChange}
              />
            )}

            {isUpgrading && (
              <ChangePlanButton
                site={site}
                plan={plan}
                loading={loading}
                currency={currency}
                label='Updgrade plan'
                buttonClassName='primary'
                setLoading={setLoading}
                onChange={onPlanChange}
              />
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
