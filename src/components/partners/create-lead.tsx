import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Label } from 'components/label';
import { Option, Select } from 'components/select';
import { Input } from 'components/input';
import { HOSTNAME_REGEX } from 'data/sites/constants';
import { useToasts } from 'hooks/use-toasts';
import { referralCreate } from 'lib/api/graphql';
import type { UsersPartner } from 'types/graphql';

interface Props {
  partner: UsersPartner;
  onClose?: VoidFunction;
}

const CreateSchema = Yup.object().shape({
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
  protocol: Yup.string().oneOf(['http://', 'https://'], 'Please select a protocol')
});

const validateUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

export const CreateLead: FC<Props> = ({ partner, onClose }) => {
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
      <Button className='primary' onClick={openModal}>
        + Add Lead
      </Button>
            
      <Modal ref={ref} onClose={onClose}>
        <ModalBody aria-labelledby='create-lead-title' aria-describedby='create-lead-description'>
          <Formik
            initialValues={{ protocol: 'https://', hostname: '' }}
            validationSchema={CreateSchema}
            onSubmit={(values, { setSubmitting, setErrors, setFieldValue }) => {
              (async () => {
                try {
                  const { protocol, hostname } = values;

                  // Some people paste the whole url in with the protocol
                  // so we strip it and update the field
                  const host = hostname.replace(/^https?:\/\//, '');
                  setFieldValue('hostname', host);

                  const url = `${protocol}${host}`;

                  if (!validateUrl(url)) {
                    return setErrors({ 'hostname': 'URL must be a valid hostname' });
                  }

                  await referralCreate(partner.id, { url });

                  closeModal();
                  toasts.add({ type: 'success', body: 'Lead created successfully' });
                } catch(error: any) {
                  console.error(error);

                  if (/already registered/.test(error)) {
                    setErrors({ hostname: 'This url is already registered' });
                  } else {
                    toasts.add({ type: 'error', body: 'There was an error creating your lead' });
                  }
                }

                setSubmitting(false);
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
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>
                  <p id='create-lead-title'><b>Add Lead</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='create-lead-description'>Please enter the URL of the site your are referring below. We will update the status once a site has been added with a matching URL.</p>
                  <Label htmlFor='hostname'>Site URL</Label>
                  <div className='select-input-group'>
                    <Select name='protocol' onChange={handleChange} value={values.protocol} invalid={touched.protocol && !!errors.protocol}>
                      <Option value='https://'>https://</Option>
                      <Option value='http://'>http://</Option>
                    </Select>
                    <Input
                      name='hostname' 
                      type='text' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='e.g. www.mywebsite.com'
                      autoComplete='off'
                      value={values.hostname}
                      invalid={touched.hostname && !!errors.hostname}
                    />
                    <span className='validation'>{errors.hostname}</span>
                  </div>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting || !(dirty && isValid)} type='submit' className='primary'>
                    Add Lead
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
