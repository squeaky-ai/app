import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { createSite } from 'lib/api/graphql';
import { HOSTNAME_REGEX } from 'data/sites/constants';
import { useToasts } from 'hooks/use-toasts';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CreateSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
  protocol: Yup.string().oneOf(['http://', 'https://'], 'Please select a protocol')
});

export const CreateSite: FC<Props> = ({ children, className }) => {
  const router = useRouter();
  const toasts = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <Button className={className} onClick={openModal}>
        {children}
      </Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='create-site-title' aria-describedby='create-site-description'>
          <Formik
            initialValues={{ name: '', protocol: 'https://', hostname: '' }}
            validationSchema={CreateSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              (async () => {
                try {
                  const { name, protocol, hostname } = values;
                  const url = `${protocol}${hostname}`;

                  if (!validateUrl(url)) {
                    return setErrors({ 'hostname': 'URL must be a valid hostname' });
                  }

                  const site = await createSite(name, url);

                  closeModal();
                  await router.push(`/sites/${site.id}/settings/details/tracking-code`);
                } catch(error: any) {
                  if (/already registered/.test(error)) {
                    setErrors({ hostname: 'This site is already registered' });
                  } else {
                    toasts.add({ type: 'error', body: 'There was an error creating your site' });
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
                  <p id='create-site-title'><b>Add Site</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='create-site-description'>Please enter your site details below.</p>

                  <Label htmlFor='name'>Site Name</Label>
                  <Input
                    name='name' 
                    type='text' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. My Webite'
                    value={values.name}
                    invalid={touched.name && !!errors.name}
                  />
                  <span className='validation'>{errors.name}</span>

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
                      value={values.hostname}
                      invalid={touched.hostname && !!errors.hostname}
                    />
                    <span className='validation'>{errors.hostname}</span>
                  </div>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting || !(dirty && isValid)} type='submit' className='primary'>
                    Create
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
