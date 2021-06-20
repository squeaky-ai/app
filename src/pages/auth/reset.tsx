import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { resetPassword, changePassword } from 'lib/api/auth';
import { Container } from 'components/container';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Password } from 'components/password';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const ResetSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required')
});

const ChangeSchema = Yup.object().shape({
  password: Yup.string().required('Password is required')
});

enum PageView {
  EMAIL,
  VERIFY,
  CHANGE,
  COMPLETE
}

const Reset: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const [pageView, setPageView] = React.useState(PageView.EMAIL);
  const [email, setEmail] = React.useState<string>(null);

  React.useEffect(() => {
    if (router.query.token) {
      setPageView(PageView.CHANGE);
    }
  }, []);

  return (
    <div className='page reset'>
      <Head>
        <title>Squeaky / Reset Password</title>
      </Head>
      <Container className='sm'>
        <Card>
          <Link href='/'>
            <a className='logo'>
              <Image src='/logo.svg' height={76} width={246} />
            </a>
          </Link>

          {pageView == PageView.EMAIL && (
            <>
              <h2>Reset Password</h2> 

              <p>If you’d like to reset your password, please enter your email address below and click the reset password button.</p>

              <Formik
                initialValues={{ email: '' }}
                validationSchema={ResetSchema}
                onSubmit={(values, { setSubmitting }) => {
                  (async () => {
                    const { body } = await resetPassword(values.email);
                    
                    setEmail(values.email);
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

                    <Button  type='submit' disabled={isSubmitting} className='primary'>
                      Reset Password
                    </Button>
                  </form>
                )}
              </Formik>
            </>
          )}

          {pageView == PageView.VERIFY && (
            <div className='verify'>
              <i className='ri-checkbox-circle-line' />
              <h4>Check Your Email</h4>
              <p>If you have an existing Squeaky account you will receive password reset instructions at the email address <b>{email}</b>.</p>
              <Button className='secondary' onClick={() => console.log('TODO')}>
                Resend Password Reset Email
              </Button>
            </div>
          )}

          {pageView === PageView.CHANGE && (
            <>
              <h2>Create New Password</h2>

              <Formik
                initialValues={{ reset_password_token: router.query.token as string, password: '' }}
                validationSchema={ChangeSchema}
                onSubmit={(values, { setSubmitting }) => {
                  (async () => {
                    const { error } = await changePassword(values);
                    setSubmitting(false);

                    if (!error) {
                      setPageView(PageView.COMPLETE);
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
                    <Label htmlFor='password'>New password</Label>
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

                    <Button  type='submit' disabled={isSubmitting} className='primary'>
                      Reset Password
                    </Button>
                  </form>
                )}
              </Formik>
            </>
          )}

          {pageView === PageView.COMPLETE && (
            <div className='complete'>
              <div className='check'>
                <i className='ri-check-line' />
              </div>
              <h4>Password Reset Successfully</h4>
              <Link href='/auth/login'>
                <a className='button primary'>Go To Login Page</a>
              </Link>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Reset;
export { getServerSideProps };
