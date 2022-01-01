import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Logo } from 'components/logo';
import { Container } from 'components/container';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button, DelayedButton } from 'components/button';
import { Password } from 'components/password';
import { PASSWORD_REGEX } from 'data/users/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { resetPassword, changePassword } from 'lib/api/auth';

const ResetSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required')
});

const ChangeSchema = Yup.object().shape({
  password: Yup.string().matches(PASSWORD_REGEX, 'Password must match the criteria defined below').required('Password is required')
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
    <>
      <Head>
        <title>Squeaky | Reset Password</title>
      </Head>

      <a href='/' className='logo'>
        <Logo src='logo' height={48} width={156} alt='Squeaky logo' />
      </a>

      <div className='center'>
        <Container className='sm'>
          <main>
            <Card>
              {pageView == PageView.EMAIL && (
                <>
                  <h2>Reset Password</h2> 

                  <p>If you&apos;d like to reset your password, please enter your email address below and click the reset password button.</p>

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
                      isValid,
                      dirty,
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

                        <Button  type='submit' disabled={isSubmitting || !(dirty && isValid)} className='primary'>
                          Reset Password
                        </Button>
                      </form>
                    )}
                  </Formik>
                </>
              )}

              {pageView == PageView.VERIFY && (
                <div className='verify'>
                  <Icon name='checkbox-circle-line' />
                  <h4>Check Your Email</h4>
                  <p>If you have an existing Squeaky account you will receive password reset instructions at the email address <b>{email}</b>.</p>
                  <DelayedButton delay={10} initialDelayed={false} className='secondary' onClick={() => resetPassword(email)}>
                    Resend Password
                  </DelayedButton>
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
                      isValid,
                      dirty,
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

                        <Button  type='submit' disabled={isSubmitting || !(dirty && isValid)} className='primary'>
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
                    <Icon name='check-line' />
                  </div>
                  <h4>Password Reset Successfully</h4>
                  <Link href='/auth/login'>
                    <a className='button primary'>Go To Login Page</a>
                  </Link>
                </div>
              )}
            </Card>
          </main>
        </Container>
      </div>
    </>
  );
};

export default Reset;
export { getServerSideProps };
