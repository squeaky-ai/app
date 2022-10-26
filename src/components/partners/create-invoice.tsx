import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Option, Select } from 'components/select';
import { UploadInvoice } from 'components/partners/upload-invoice';
import { Input } from 'components/input';
import { useToasts } from 'hooks/use-toasts';
import { invoiceCreate } from 'lib/api/graphql';
import { Currency, UsersPartner } from 'types/graphql';
import { CURRENCY_SYMBOLS } from 'data/common/constants';

interface Props {
  partner: UsersPartner;
  onClose?: VoidFunction;
}

interface Form {
  currency: string;
  amount: string;
  invoice: File;
}

const CreateSchema = Yup.object().shape({
  currency: Yup.string().oneOf(Object.keys(CURRENCY_SYMBOLS), 'Currency is not supported').required('Currency is required'),
  amount: Yup.number().required('Please enter a valid amount'),
  invoice: Yup.mixed().required('Invoice is required'),
});

export const CreateInvoice: FC<Props> = ({ partner, onClose }) => {
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
      <Button className='secondary' onClick={openModal}>
        Submit Invoice
      </Button>
            
      <Modal ref={ref} onClose={onClose} className='create-invoice-modal'>
        <ModalBody aria-labelledby='create-invoice-title' aria-describedby='create-invoice-description'>
          <Formik<Form>
            initialValues={{ currency: Currency.Eur, amount: '', invoice: null }}
            validationSchema={CreateSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {         
                try { 
                  await invoiceCreate(partner.id, {
                    amount: Number(values.amount),
                    currency: values.currency as Currency,
                    filename: values.invoice.name,
                  });
                  toasts.add({ type: 'success', body: 'Invoice submitted successfully' });
                  closeModal();
                } catch(error) {
                  console.error(error);
                  toasts.add({ type: 'error', body: 'Failed to submit invoice' });
                } finally {
                  setSubmitting(false);
                }
              })();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              touched,
              values,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>
                  <p id='create-invoice-title'><b>Submit Invoice</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='create-invoice-description'>If you have funds available to pay out you can submit an invoice using the form below.</p>
                  <p>Please include the following information on Squeaky BV within your invoice:</p>
                  <p><b>Company Name</b><br />Squeaky BV</p>
                  <p><b>VAT Number</b> (BTW-Nummer)<br />NL863603166B01</p>
                  <p><b>Billing Address</b><br />Debussystraat 43<br />2324KH, Leiden<br />Zuid Holland<br />The Netherlands</p>
                  <Label>Invoice Amount</Label>
                  <div className='input-group'>
                    <Select name='currency' onChange={handleChange} value={values.currency}>
                      <Option value={Currency.Eur}>{CURRENCY_SYMBOLS[Currency.Eur]}</Option>
                      <Option value={Currency.Usd}>{CURRENCY_SYMBOLS[Currency.Usd]}</Option>
                      <Option value={Currency.Gbp}>{CURRENCY_SYMBOLS[Currency.Gbp]}</Option>
                    </Select>
                    <div>
                      <Input
                        name='amount' 
                        type='number' 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.amount}
                        invalid={touched.amount && !!errors.amount}
                      />
                      <span className='validation'>{errors.amount}</span>
                    </div>
                  </div>
                  <Label>Invoice</Label>
                  <UploadInvoice 
                    invoice={values.invoice}
                    onInvoiceRemove={() => setFieldValue('invoice', null)}
                    onInvoiceSelect={file => setFieldValue('invoice', file)}
                  />
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting || !(dirty && isValid)} type='submit' className='primary'>
                    Submit Invoice
                  </Button>
                  <Button type='button' className='quaternary' onClick={closeModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};
