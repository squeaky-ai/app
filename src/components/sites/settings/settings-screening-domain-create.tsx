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

const DomainSchema = Yup.object().shape({
  value: Yup.string()
});

export const SettingsScreeningDomainCreate: FC<Props> = ({ siteId }) => {
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
      <Button className='secondary' onClick={openModal}>+ Add Domain</Button>

      <Modal ref={ref}>
        <Formik
          initialValues={{ value: '' }}
          validationSchema={DomainSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(false);
                closeModal();

                await domainBlacklistCreate({
                  siteId,
                  type: 'domain',
                  value: values.value,
                });

                toasts.add({ type: 'success', body: 'Domain added successfully' });
              } catch {
                toasts.add({ type: 'error', body: 'There was an issue adding the domain' });
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
              <ModalBody aria-labelledby='domain-create-title' aria-describedby='domain-create-description'>
                <ModalHeader>
                  <p id='domain-create-title'><b>Domain Screening</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p>To stop all recordings from visitors with a particular email domain e.g. any.email@yoursite.com, then you enter the domain name below.</p>

                  <Label htmlFor='value'>Domain</Label>
                  <div className='icon-input'>
                    <span>@</span>
                    <Input
                      name='value' 
                      type='value' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='squeaky.ai'
                      autoComplete='off'
                      value={values.value}
                      invalid={touched.value && !!errors.value}
                    />
                    <span className='validation'>{errors.value}</span>
                  </div>

                  <Message 
                    type='error'
                    message={<p>This will also delete any historical visitors and/or recording data associated with this domain.</p>}
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
