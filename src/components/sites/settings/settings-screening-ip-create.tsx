import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { ipBlacklistCreate } from 'lib/api/graphql';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';
import { IP_ADDRESS_REGES } from 'data/sites/constants';

interface Props {
  siteId: string;
}

const IpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  value: Yup.string().matches(IP_ADDRESS_REGES, 'Value must be formatted X.X.X.X')
});

export const SettingsScreeningIpCreate: FC<Props> = ({ siteId }) => {
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
      <Button className='secondary' onClick={openModal}>+ Add IP Address</Button>

      <Modal ref={ref}>
        <Formik
          initialValues={{ name: '', value: '' }}
          validationSchema={IpSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(false);
                closeModal();

                await ipBlacklistCreate({
                  siteId,
                  name: values.name,
                  value: values.value,
                });

                toasts.add({ type: 'success', body: 'IP added successfully' });
              } catch {
                toasts.add({ type: 'error', body: 'There was an issue adding the IP' });
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
              <ModalBody aria-labelledby='ip-create-title' aria-describedby='ip-create-description'>
                <ModalHeader>
                  <p id='ip-create-title'><b>IP Address Screening</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Label htmlFor='value'>IP Address</Label>
                  <Input
                    name='value' 
                    type='value' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='192.168.0.1'
                    value={values.value}
                    invalid={touched.value && !!errors.value}
                  />
                  <span className='validation'>{errors.value}</span>

                  <Label htmlFor='name'>Name</Label>
                  <p className='extra'>(Useful for finding and removing entries later)</p>
                  <Input
                    name='name' 
                    type='name' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Office'
                    value={values.name}
                    invalid={touched.name && !!errors.name}
                  />
                  <span className='validation'>{errors.name}</span>
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
