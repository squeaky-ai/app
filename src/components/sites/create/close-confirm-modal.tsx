import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalContents, ModalHeader, ModalFooter } from 'components/modal';

interface Props {
  open: boolean;
  onCloseCancel: VoidFunction;
  onCloseConfirm: VoidFunction;
}

export const CloseConfirmModal: FC<Props> = ({ open, onCloseCancel, onCloseConfirm }) => {
  const ref = React.useRef<Modal>();

  const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.hide();
  };

  const confirmClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    closeModal(event);
    onCloseConfirm();
  };

  React.useEffect(() => {
    if (ref.current) {
      open
        ? ref.current.show()
        : ref.current.hide();
    }
  }, [open]);

  return (
    <Modal ref={ref} className='sm site-create-cancel-modal' onClose={onCloseCancel}>
      <ModalBody>
        <ModalHeader>
          <p id='site-create-cancel'><b>Leave &apos;Add Site&apos; Flow</b></p>
          <Button type='button' onClick={closeModal}>
            <Icon name='close-line' />
          </Button>
        </ModalHeader>
        <ModalContents>
          <p>Are you sure you leave the &apos;Add Site&apos; flow?</p>
          <p>Your site has already been created and you can continue with configuration from within the site.</p>
        </ModalContents>
        <ModalFooter>
          <Button type='button' className='tertiary' onClick={confirmClose}>
            Exit Flow
          </Button>
          <Button type='button' className='quaternary' onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
