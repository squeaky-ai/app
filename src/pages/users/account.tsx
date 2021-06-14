import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from '../../components/container';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Divider } from '../../components/divider';
import { Header } from '../../components/sites/header';
import { Tabs } from '../../components/users/tabs';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const AccountSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const Users: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page user account'>
    <Head>
      <title>Squeaky / User / Account</title>
    </Head>

    <Header />

    <Container className='lg centered'>
      <h3 className='title'>Account Settings</h3>

      <Tabs user={user} page='account' />

      <Container className='xsm'>
        <Formik
          initialValues={{ email: user.email, firstName: user.firstName, lastName: user.lastName }}
          validationSchema={AccountSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
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

              <Label htmlFor='firstName'>First name</Label>
              <Input
                name='firstName' 
                type='text' 
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='e.g. Jess'
                autoComplete='given-name'
                value={values.firstName}
                invalid={touched.firstName && !!errors.firstName}
              />
              <span className='validation'>{errors.firstName}</span>

              <Label htmlFor='lastName'>Last name</Label>
              <Input
                name='lastName' 
                type='text' 
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='e.g. Smith'
                autoComplete='family-name'
                value={values.lastName}
                invalid={touched.lastName && !!errors.lastName}
              />
              <span className='validation'>{errors.lastName}</span>

              <Button  type='submit' disabled={isSubmitting} className='primary'>
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Container>

      <Divider />

      <Link href='/users/delete'>
        <a className='delete-account'>Delete account</a>
      </Link>
    </Container>
  </div>
);

export default Users;
export { getServerSideProps };