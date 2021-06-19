import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../button';
import { Select, Option } from '../../components/select';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../modal';
import { teamInvite } from '../../lib/api/graphql';
import { useToasts } from '../../hooks/toasts';
import type { Site } from '../../types/site';

interface Props {
  site: Site;
}

const InviteSchema = Yup.object().shape({ 
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  role: Yup.string().oneOf(['0', '1'], 'Please select a role')
});

export const InviteTeam: FC<Props> = ({ site }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='primary invite-member' onClick={openModal}>
        Invite New Member
      </Button>

      <Modal ref={ref}>
        <ModalBody>
          <Formik
            initialValues={{ email: '', role: '0' }}
            validationSchema={InviteSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                const { error } = await teamInvite({ 
                  siteId: site.id, 
                  email: values.email, 
                  role: Number(values.role) 
                });

                setSubmitting(false); 

                if (error) {
                  toast.add({ type: 'error', body: 'There was an unexpected error when sending your invitation. Please try again.' });
                } else {
                  toast.add({ type: 'success', body: 'Invitation sent' });

                  closeModal();
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
                <ModalHeader>
                  <p><b>Invite New Team Member</b></p>
                  <Button type='button' onClick={closeModal}>
                    <i className='ri-close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <Label htmlFor='email'>Email address</Label>
                  <Input
                    name='email' 
                    type='email' 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='e.g. jess@email.com'
                    value={values.email}
                    invalid={touched.email && !!errors.email}
                  />
                  <span className='validation'>{errors.email}</span>

                  <Label htmlFor='role'>Role</Label>
                  <Select name='role' onChange={handleChange} value={values.role} invalid={touched.role && !!errors.role}>
                    <Option value='0'>User</Option>
                    <Option value='1'>Admin</Option>
                  </Select>
                  <span className='validation'>{errors.role}</span>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting} type='submit' className='primary'>
                    Continue
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
