import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from '../../components/container';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Label } from '../../components/label';
import { Header } from '../../components/sites/header';
import { Tabs } from '../../components/users/tabs';
import { Main } from '../../components/main';
import { Password } from '../../components/password';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().required('New password is required'),
});

const UsersPassword: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page user password'>
    <Head>
      <title>Squeaky / User / Password</title>
    </Head>

    <Header />

    <Main>
      <h3 className='title'>Account Settings</h3>

      <Tabs user={user} page='password' />

      <p>To change your password please complete the form below.</p>

      <Container className='xsm'>
        <Formik
          initialValues={{ currentPassword: '', newPassword: '' }}
          validationSchema={PasswordSchema}
          onSubmit={(values) => {
            (async () => {
              // TODO
              console.log(values);
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
              <Label htmlFor='currentPassword'>Current password</Label>
              <Input
                name='currentPassword' 
                type='password' 
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete='current-password'
                value={values.currentPassword}
                invalid={touched.currentPassword && !!errors.currentPassword}
              />
              <span className='validation'>{errors.currentPassword}</span>

              <Label htmlFor='newPassword'>New password</Label>
              <Input
                name='newPassword' 
                type='password' 
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete='new-password'
                value={values.newPassword}
                invalid={touched.newPassword && !!errors.newPassword}
              />
              <span className='validation'>{errors.newPassword}</span>

              <Password password={values.newPassword} />

              <Button  type='submit' disabled={isSubmitting} className='primary'>
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </Main>
  </div>
);

export default UsersPassword;
export { getServerSideProps };
