import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { createSite } from 'lib/api/graphql';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CreateSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  url: Yup.string().url('URL is not valid').required('Site URL is required')
});

export const CreateSite: FC<Props> = ({ children, className }) => {
  const router = useRouter();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className={className} onClick={openModal}>
        {children}
      </Button>

      <Modal ref={ref}>
        <ModalBody>
          <Formik
            initialValues={{ name: '', url: '' }}
            validationSchema={CreateSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              (async () => {
                const { site, error } = await createSite(values.name, values.url);

                setSubmitting(false);

                if (error) {
                  const [key, value] = Object.entries(error)[0];
                  setErrors({ [key]: value });
                } else {
                  closeModal();
                  await router.push(`/sites/${site.id}/recordings`);
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
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader>
                  <p><b>Add Site</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p>Please enter your site details below.</p>

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

                  <Label htmlFor='url'>Site URL</Label>
                  <Input
                    name='url' 
                    type='url' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. www.mywebsite.com'
                    value={values.url}
                    invalid={touched.url && !!errors.url}
                  />
                  <span className='validation'>{errors.url}</span>
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
