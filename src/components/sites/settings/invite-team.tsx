import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { teamInvite } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { ADMIN, MEMBER, READ_ONLY } from 'data/teams/constants';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

const InviteSchema = Yup.object().shape({ 
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  role: Yup.string().oneOf([READ_ONLY.toString(), MEMBER.toString(), ADMIN.toString()], 'Please select a role')
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
        <ModalBody aria-labelledby='invite-team-title'>
          <Formik
            initialValues={{ email: '', role: MEMBER.toString() }}
            validationSchema={InviteSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                try {
                  await teamInvite({ 
                    siteId: site.id, 
                    email: values.email, 
                    role: Number(values.role) 
                  });

                  setSubmitting(false); 
                  closeModal();

                  toast.add({ type: 'success', body: 'Invitation sent' });
                } catch(error) {
                  toast.add({ type: 'error', body: 'There was an unexpected error when sending your invitation. Please try again.' });
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
                  <p id='invite-team-title'><b>Invite New Team Member</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
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
                    autoComplete='email'
                    value={values.email}
                    invalid={touched.email && !!errors.email}
                  />
                  <span className='validation'>{errors.email}</span>

                  <Label htmlFor='role'>Role</Label>
                  <Select name='role' onChange={handleChange} value={values.role} invalid={touched.role && !!errors.role}>
                    <Option value={READ_ONLY}>Read-only</Option>
                    <Option value={MEMBER}>User</Option>
                    <Option value={ADMIN}>Admin</Option>
                  </Select>
                  <span className='validation'>{errors.role}</span>
                </ModalContents>
                <ModalFooter>
                  <Button disabled={isSubmitting} type='submit' className='primary'>
                    Send invitation
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
