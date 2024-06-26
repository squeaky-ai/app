import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Message } from 'components/message';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { domainBlacklistCreate } from 'lib/api/graphql';

interface Props {
  siteId: string;
}

const EmailSchema = Yup.object().shape({
  value: Yup.string()
});

export const SettingsScreeningEmailCreate: FC<Props> = ({ siteId }) => {
  const ref = React.useRef<Modal>();
  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='secondary' onClick={openModal}>+ Add Email</Button>

      <Modal ref={ref}>
        <Formik
          initialValues={{ value: '' }}
          validationSchema={EmailSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(false);
                closeModal();

                await domainBlacklistCreate({
                  siteId,
                  type: 'email',
                  value: values.value,
                });

                toasts.add({ type: 'success', body: 'Email added successfully' });
              } catch {
                toasts.add({ type: 'error', body: 'There was an issue adding the email' });
              }
            })();
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='email-create-title' aria-describedby='email-create-description'>
                <ModalHeader>
                  <p id='email-create-title'><b>Email Screening</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Label htmlFor='value'>Email address</Label>
                  <Input
                    name='value' 
                    type='value' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. jess@squeaky.ai'
                    autoComplete='email'
                    value={values.value}
                    invalid={touched.value && !!errors.value}
                  />
                  <span className='validation'>{errors.value}</span>

                  <Message 
                    type='error'
                    message={<p>This will also delete any historical visitors and/or recording data associated with this email address.</p>}
                  />
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary' disabled={isSubmitting}>
                    Save
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
