import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Select, Option } from 'components/select';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { INVOICE_PAID, INVOICE_PENDING } from 'data/users/constants';
import { adminPartnerInvoiceUpdate } from 'lib/api/graphql';
import type { UsersInvoice } from 'types/graphql';

interface Props {
  invoice: UsersInvoice;
  onClose: VoidFunction;
}

const InvoiceUpdateSchema = Yup.object().shape({
  status: Yup.number(),
});

export const UserPartnerInvoicesUpdate: FC<Props> = ({ invoice, onClose }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };
  return (
    <>
      <Button className='link' onClick={openModal}>Update Status</Button>

      <Modal ref={ref} onClose={onClose}>
        <Formik
          initialValues={{ status: invoice.status }}
          validationSchema={InvoiceUpdateSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                await adminPartnerInvoiceUpdate({ id: invoice.id, status: Number(values.status) });
                closeModal();
                toasts.add({ type: 'success', body: 'Invoice status updated' });
              } catch {
                toasts.add({ type: 'error', body: 'There was an issue updating the invoice status' });
              } finally {
                setSubmitting(false);
              }
            })();
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            values,
          }) => (                
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='update-invoice-status-title'>
                <ModalHeader>
                  <p id='update-invoice-status-title'><b>Update Status</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Select
                    name='status'
                    value={values.status}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <Option value={INVOICE_PENDING}>Pending</Option>
                    <Option value={INVOICE_PAID}>Paid</Option>
                  </Select>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary'>
                    Update Status
                  </Button>
                  <Button type='button' className='quaternary' onClick={closeModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalBody>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
