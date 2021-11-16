import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from 'components/container';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Logo } from 'components/logo';
import { Input } from 'components/input';
import { Button, DelayedButton } from 'components/button';
import { Message } from 'components/message';
import { login, confirmAccount, reconfirmAccount } from 'lib/api/auth';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useLoginAttemps, MAX_ATTEMPTS } from 'hooks/use-login-attempts';
import { useToasts } from 'hooks/use-toasts';
import { BASE_PATH } from 'data/common/constants';

enum PageView {
  LOGIN,
  UNCONFIRMED
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const toasts = useToasts();
  const [email, setEmail] = React.useState<string>('');
  const [failed, setFailed] = React.useState<boolean>(false);
  const [pageView, setPageView] = React.useState(PageView.LOGIN);

  const { 
    attempts, 
    exceeded, 
    incr, 
    clear 
  } = useLoginAttemps();

  const resendConfirmation = async () => {
    const { error } = await reconfirmAccount(email);

    if (error) {
      toasts.add({ type: 'error', body: 'There was an issue resending the verification email' });
    } else {
      toasts.add({ type: 'success', body: 'Verification email send successfully' });
      setPageView(PageView.LOGIN);
    }
  };

  React.useEffect(() => {
    (async () => {
      const { token } = router.query;
      if (!token) return;

      const { body, error } = await confirmAccount(token as string);
      if (!error) {
        setEmail(body.email);
        router.push({ pathname: '/auth/login', query: {} });
      } else {
        toasts.add({ type: 'error', body: 'There was an error with your sign in token' });
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Squeaky | Log in</title>
      </Head>

      <div className='center'>
        <Container className='sm'>
          <Card>
            <a href='/' className='logo'>
              <Logo src='logo' height={76} width={246} alt='Squeaky logo' />
            </a>

            {pageView === PageView.LOGIN && ( 
              <>
                <h2>Log In</h2>

                {!!email && (
                  <Message
                    type='success'
                    message='Your email address has been verified.'
                  />
                )}

                {(exceeded || failed) && (
                  <Message 
                    type='error' 
                    message={
                      exceeded
                        ? <span>You have made too many failed log in attempts. <b>Please retry in 10 minutes or contact us</b>.</span>
                        : <span>Email and password combination not recognised. <b>{MAX_ATTEMPTS - attempts} attempts remaining</b>.</span>
                    }
                  />
                )}

                <Formik
                  initialValues={{ email, password: '' }}
                  validationSchema={LoginSchema}
                  enableReinitialize
                  onSubmit={(values, { setSubmitting }) => {
                    (async () => {
                      if (exceeded) return;

                      const { error } = await login(values);

                      setSubmitting(false);

                      if (!error) {
                        clear();
                        return await router.push('/sites');
                      }

                      if (/confirm your email/.test(error.error)) {
                        setEmail(values.email);
                        return setPageView(PageView.UNCONFIRMED);
                      }
                    
                      setFailed(true);
                      return incr();
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

                      <Label htmlFor='password'>
                        Password
                        <Link href='/auth/reset'>
                          <a>Forgot your password?</a>
                        </Link>
                      </Label>
                      <Input
                        name='password' 
                        type='password' 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        autoComplete='current-password'
                        value={values.password}
                        invalid={touched.password && !!errors.password}
                      />
                      <span className='validation'>{errors.password}</span>

                      <Button type='submit' disabled={isSubmitting || !(dirty && isValid) || exceeded} className='primary'>
                        Log in
                      </Button>
                    </form>
                  )}
                </Formik>
              </>
            )}

            {pageView === PageView.UNCONFIRMED && (
              <>
                <Message
                  type='info'
                  message={<span>You have previously attempted to sign up with email address <span className='email'>{email}</span>. To resend the verification email click the button below.</span>}
                  className='reconfirm-message'
                />

                <DelayedButton delay={10} initialDelayed={false} className='primary' onClick={resendConfirmation}>
                  Resend Verfication Email
                </DelayedButton>
              </>
            )}
          </Card>
        </Container>

        <div className='footer-link'>
          <p>New to Squeaky? <Link href='/auth/signup'><a>Sign up</a></Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
export { getServerSideProps };
