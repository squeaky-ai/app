import React, { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Label } from '../../../components/label';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Main } from '../../../components/main';
import { Select, Option } from '../../../components/select';
import { Tabs } from '../../../components/sites/tabs';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../../../components/modal';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { teamInvite, teamInviteCancel, teamInviteResend, teamUpdate, teamLeave, teamDelete } from '../../../lib/api/graphql';
import { useSite } from '../../../hooks/sites';
import { useToasts } from '../../../hooks/toasts';

const InviteSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  role: Yup.string().oneOf(['0', '1'], 'Please select a role')
});

const roleName = (role: number | string) => {
  switch(Number(role)) {
    case 1:
      return 'Admin';
    case 2:
      return 'Owner';
    default:
      return 'User';
  }
};

const SitesTeam: NextPage<ServerSideProps> = ({ user }) => {
  const toast = useToasts();
  const router = useRouter();
  const ref = React.createRef<Modal>();
  const [loading, site] = useSite();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const resendInvitation = async (id: string) => {
    const { error } = await teamInviteResend({ siteId: site.id, teamId: id });
    error
      ? toast.add({ type: 'error', body: 'There was an unexpected error when sending your invitation. Please try again.' })
      : toast.add({ type: 'success', body: 'Invitation resent' })
  };

  const cancelInvitation = async (id: string) => {
    const { error } = await teamInviteCancel({ siteId: site.id, teamId: id });
    error
      ? toast.add({ type: 'error', body: 'There was an unexpected error when cancelling your invitation. Please try again.' })
      : toast.add({ type: 'success', body: 'Invitation cancelled' });
  };

  const changeRole = async (id: string, role: string) => {
    const { error } = await teamUpdate({ siteId: site.id, teamId: id, role: Number(role) });
    error
      ? toast.add({ type: 'error', body: 'There was an unexpected error when changing the user role. Please try again.' })
      : toast.add({ type: 'success', body: 'Role change complete' })
  };

  const leaveTeam = async () => {
    const { error } = await teamLeave({ siteId: site.id });

    if (error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when leaving the team. Please try again.' });
    } else {
      toast.add({ type: 'success', body: `You have successfully left the ${site.name} team` });
      await router.push('/sites');
    }
  };

  const deleteTeam = async (id: string) => {
    const { error } = await teamDelete({ siteId: site.id, teamId: id });
    error
      ? toast.add({ type: 'error', body: 'There was an unexpected error when removing your user. Please try again.' })
      : toast.add({ type: 'success', body: 'User removed successfully' })
  };

  return (
    <div className='page team'>
      <Head>
        <title>Squeaky / Site Team</title>
      </Head>

      <Header />

      {!loading && site && (
        <Main>
          <Tabs site={site} page='team' />
          <h3 className='title'>Team</h3>

          <Container className='md'>
            <p>This page allows you to view, invite and manage the roles of any team members associated with this site. Adding members is always free of charge, regardless of their role.</p>
          </Container>

          <div className='table'>
            <table cellSpacing='0'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email address</th>
                  <th>Role</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {site.team.map(team => {
                  const self = Number(team.user.id) === user.id;
                  const owner = team.role === 2;
                  const invited = team.status === 1;
                  const disabled = self && team.role === 0;

                  return (
                    <tr key={team.id}>
                      <td>
                        {invited && <i>Invited</i>}
                        {self
                          ? <><b>{team.user.fullName}</b> <i>(you)</i></>
                          : <span>{team.user.fullName}</span>
                        }
                      </td>
                      <td>{team.user.email}</td>
                      <td className='role'>
                        {owner && roleName(team.role)}
                        {!owner && (
                          <Select name='role' onChange={(event: ChangeEvent) => changeRole(team.id, (event.target as HTMLSelectElement).value)} defaultValue={team.role} disabled={disabled}>
                            <Option value='0'>User</Option>
                            <Option value='1'>Admin</Option>
                          </Select>
                        )}
                      </td>
                      <td className='options'>
                        {invited && (
                          <>
                            <Button className='positive' disabled={disabled} onClick={() => resendInvitation(team.id)}>Resend Invitation</Button>
                            <Button className='negative' disabled={disabled} onClick={() => cancelInvitation(team.id)}>Cancel Invitation</Button>
                          </>
                        )}
                        {!invited && (
                          <>
                            {!owner && self && (
                              <Button className='negative' onClick={() => leaveTeam()}>Leave site</Button>
                            )}
                            {!owner && !self && (
                              <Button className='negative' disabled={disabled} onClick={() => deleteTeam(team.id)}>Remove</Button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <Button className='primary invite-member' onClick={openModal}>
            Invite New Member
          </Button>

          <h3>Roles</h3>

          <Container className='md'>
            <p>Roles are site-specific and determine what level of control individual team members have over any site they are associated with, only admins and owners can edit roles.</p>
          </Container>

          <div className='roles'>
            <div className='role'>
              <h4>Owner</h4>
              <p>The site owner can:</p>
              <ul>
                <li>Manage site billing</li>
                <li>Manage team members</li>
                <li>Manage site settings</li>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
            <div className='role'>
              <h4>Admin</h4>
              <p>Site admins can:</p>
              <ul>
                <li>Manage team members (excluding owner)</li>
                <li>Manage site settings</li>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
            <div className='role'>
              <h4>User</h4>
              <p>Site users can:</p>
              <ul>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
          </div>
        </Main>
      )}

      <Modal ref={ref}>
        <ModalBody>
          <Formik
            initialValues={{ email: '', role: '0' }}
            validationSchema={InviteSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
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
                  <Label htmlFor='email'>Emaiil address</Label>
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
    </div>
  );
};

export default SitesTeam;
export { getServerSideProps };
