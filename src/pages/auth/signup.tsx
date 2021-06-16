import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { emailExists, signup } from '../../lib/api/auth';
import { Container } from '../../components/container';
import { Card } from '../../components/card';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Message } from '../../components/message';
import { Password } from '../../components/password';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

enum PageView {
  EMAIL,
  PASSWORD,
  EMAIL_TAKEN,
  VERIFY
}

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  terms: Yup.boolean().oneOf([true], 'You must agree to the terms')
});

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required')
});

const Signup: NextPage<ServerSideProps> = () => {
  const [pageView, setPageView] = React.useState(PageView.EMAIL);
  const [email, setEmail] = React.useState<string>(null);

  return (
    <div className='page signup'>
      <Head>
        <title>Squeaky / Sign up</title>
      </Head>
      <Container className='sm'>
        <Card>
          <Link href='/'>
            <a className='logo'>
              <Image src='/logo.svg' height={76} width={246} />
            </a>
          </Link>

          {pageView === PageView.EMAIL && (
            <>
              <h2>Sign Up</h2>
              <Formik
                initialValues={{ email: '', terms: false }}
                validationSchema={EmailSchema}
                onSubmit={(values, { setSubmitting }) => {
                  (async () => {
                    const { body } = await emailExists<boolean>(values.email);
                    setSubmitting(false);
                    setEmail(values.email);
                    setPageView(body ? PageView.EMAIL_TAKEN : PageView.PASSWORD);
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
                    <Label htmlFor='email'>Email</Label>
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

                    <Checkbox name='terms' onChange={handleChange} checked={values.terms} invalid={touched.terms && !!errors.terms}>
                      I have read and accept the <a href='#TODO'>Terms Of Use</a>
                    </Checkbox>
                    <span className='validation'>{errors.terms}</span>

                    <Button type='submit' disabled={isSubmitting} className='primary'>
                      Continue
                    </Button>
                  </form>
                )}
              </Formik>
            </>
          )}

          {pageView === PageView.PASSWORD && (
            <>
              <h2>Sign Up</h2>
              <Formik
                initialValues={{ email, password: '' }}
                validationSchema={PasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                  (async () => {
                    const { body } = await signup({ email: values.email, password: values.password });
                    setSubmitting(false);

                    if (body) {
                      setPageView(PageView.VERIFY);
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
                    <Label htmlFor='email'>Email</Label>
                    <p>{values.email}</p>

                    <Label htmlFor='password'>Create password</Label>
                    <Input
                      name='password' 
                      type='password' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete='new-password'
                      value={values.password}
                      invalid={touched.password && !!errors.password}
                    />
                    <span className='validation'>{errors.password}</span>

                    <Password password={values.password} />

                    <Button type='submit' disabled={isSubmitting} className='primary'>
                      Sign up
                    </Button>
                  </form>
                )}
              </Formik>
            </>
          )}

          {pageView === PageView.EMAIL_TAKEN && (
            <div className='email-taken'>
              <Message type='info' message={`A user with the email address ${email || ''} already exists. Please choose from the options below.`} />
              <Link href='/auth/signin'>
                <a className='button primary'>Go To Login Page</a>
              </Link>
              <Button className='secondary' onClick={() => setPageView(PageView.EMAIL)}>
                Sign Up With A Different Email
              </Button>
            </div>
          )}

          {pageView === PageView.VERIFY && (
            <div className='verify'>
              <i className='ri-checkbox-circle-line' />
              <h4>Sign Up Complete</h4>
              <p>To log in to your account, please open the verification email sent to <b>{email}</b> and click the link provided.</p>
              <Button className='secondary' onClick={() => console.log('TODO')}>
                Resend Verification Email
              </Button>
            </div>
          )}
        </Card>
      </Container>

      <div className='footer-link'>
        <p>Already have an account? <Link href='/auth/signin'><a>Log in</a></Link></p>
      </div>
    </div>
  ); 
};

export default Signup;
export { getServerSideProps };
