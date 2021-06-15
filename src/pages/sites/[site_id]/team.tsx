import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Label } from '../../../components/label';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Select, Option } from '../../../components/select';
import { Tabs } from '../../../components/sites/tabs';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from '../../../components/modal';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const InviteSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  role: Yup.string().oneOf(['0', '1'], 'Please select a role')
});

const roleName = (role: number | string) => {
  console.log(role);
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
  const ref = React.createRef<Modal>();
  const [loading, site] = useSite();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <div className='page team'>
      <Head>
        <title>Squeaky / Site Team</title>
      </Head>

      <Header />

      {!loading && site && (
        <Container className='lg centered'>
          <Tabs site={site} page='team' />
          <h3>Team</h3>

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
                {site.team.map(team => (
                  <tr key={team.id}>
                    <td>
                      <b>{team.user.fullName}</b>
                      {Number(team.user.id) === user.id && <i> (you)</i>}
                    </td>
                    <td>{team.user.email}</td>
                    <td>{roleName(team.role)}</td>
                    <td>-</td>
                  </tr>
                ))}
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
        </Container>
      )}

      <Modal ref={ref}>
        <ModalBody>
          <Formik
            initialValues={{ email: '', role: '0' }}
            validationSchema={InviteSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              (async () => {
                console.log(values);    
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
