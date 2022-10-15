import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { adminReferralDelete, referralDelete } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { UsersReferral } from 'types/graphql';

interface Props {
  admin: boolean;
  referral: UsersReferral;
  onClose?: VoidFunction;
}

export const PartnerReferredSiteDelete: FC<Props> = ({ admin, referral, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const deleteReferral = async () => {
    try {
      if (admin) {
        await adminReferralDelete({ id: referral.id });
      } else {
        await referralDelete({ id: referral.id });
      }
      toasts.add({ type: 'success', body: 'Referral deleted successfully' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to delete referral' });
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button onClick={openModal}>
        <Icon name='delete-bin-line' /> Delete
      </Button>
            
      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-referral-title' aria-describedby='delete-referral-description'>
          <ModalHeader>
            <p id='delete-referral-title'><b>Delete Referral</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='delete-referral-description'>Are you sure you wish to delete this referral?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={deleteReferral}>
              Delete Referral
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
