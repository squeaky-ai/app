import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { invoiceDelete } from 'lib/api/graphql';
import type { UsersInvoice } from 'types/graphql';

interface Props {
  invoice: UsersInvoice;
  onClose: VoidFunction;
}

export const DeleteInvoice: FC<Props> = ({ invoice, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleDelete = async () => {
    try {
      await invoiceDelete({ id: invoice.id });
      toasts.add({ type: 'success', body: 'Invoice deleted successfully' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to delete invoice' });
    }
  };

  return (
    <>
      <Button className='link' onClick={openModal}>Delete Invoice</Button>

      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='delete-invoice-title'>
          <ModalHeader>
            <p id='delete-invoice-title'><b>Delete Invoice</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p>Are you sure you wish do delete this invoice?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='primary' onClick={handleDelete}>
            Delete Invoice
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
