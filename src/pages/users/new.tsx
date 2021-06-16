import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Container } from '../../components/container';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Header } from '../../components/sites/header';
import { Message } from '../../components/message';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';
import { updateUser } from '../../lib/api/graphql';

const NewSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const UsersNew: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className='page user new'>
      <Head>
        <title>Squeaky / User / New</title>
      </Head>

      <Header />

      <Container className='lg centered'>
        <h3 className='title'>Account Settings</h3>

        <Container className='xsm'>
          <Message 
            type='info'
            message='Please enter your name below to set up your user account.'
          />

          <Formik
            initialValues={{ email: user.email, firstName: '', lastName: '' }}
            validationSchema={NewSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                await updateUser(values);
                setSubmitting(false);
                await router.push('/sites');
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
      </Container>
    </div>
  );
};

export default UsersNew;
export { getServerSideProps };