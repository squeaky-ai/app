import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Input } from 'components/input';
import { useToasts } from 'hooks/use-toasts';
import { formatStringForUrlSlug } from 'lib/text';
import { adminPartnerCreate } from 'lib/api/graphql';
import type { AdminUser } from 'types/graphql';

interface Props {
  user: AdminUser;
}

const PartnerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required')
});

export const UserPartnerCreate: FC<Props> = ({ user }) => {
  const ref = React.useRef<Modal>();

  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='primary create-partner' onClick={openModal}>
        <Icon name='user-star-line' /> Create Partner
      </Button>

      <Modal ref={ref} className='md create-partner-modal'>
        <Formik
          initialValues={{ name: '', slug: '' }}
          validationSchema={PartnerSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            (async () => {
              try {
                await adminPartnerCreate({
                  id: user.id,
                  name: values.name,
                  slug: formatStringForUrlSlug(values.slug),
                });
                toasts.add({ type: 'success', body: 'Partner created successful' });
                closeModal();
              } catch(error: any) {
                console.error(error);
                if (/already registered/.test(error)) {
                  setErrors({ slug: 'This slug is already registered' });
                } else {
                  toasts.add({ type: 'error', body: 'Failed to create partner' });
                }
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
            touched,
            values,
            errors,
          }) => (                
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='create-partner-title' aria-describedby='create-partner-description'>
                <ModalHeader>
                  <p id='create-partner-title'><b>Create Partner</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Label htmlFor='name'>Partner Name</Label>
                  <Input 
                    type='text' 
                    name='name' 
                    autoComplete='off'
                    placeholder='e.g. My Company'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    invalid={touched.name && !!errors.name}
                  />
                  <span className='validation'>{errors.name}</span>
                  <Label htmlFor='name'>Slug</Label>
                  <div className='slug'>
                    <p>https://squeaky.ai/auth/signup/</p>
                    <div>
                      <Input 
                        type='text' 
                        name='slug' 
                        autoComplete='off'
                        placeholder='e.g. my-company'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.slug}
                        invalid={touched.slug && !!errors.slug}
                      />
                      <span className='validation'>{errors.slug}</span>
                    </div>
                  </div>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary'>
                    Create 
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
