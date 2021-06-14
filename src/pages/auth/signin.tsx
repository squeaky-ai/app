import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { signin, confirmAccount } from '../../lib/api/auth';
import { useLoginAttemps, MAX_ATTEMPTS } from '../../hooks/login-attempts';
import { Container } from '../../components/container';
import { Card } from '../../components/card';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Message } from '../../components/message';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Signin: NextPage<ServerSideProps> = () => {
  const router = useRouter();
  const [attemps, exceeded, incrAttempt, clearAttempt] = useLoginAttemps();
  const [failed, setFailed] = React.useState<boolean>(false);
  const [confirmed, setConfirmed] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const { token } = router.query;
      if (!token) return;

      const { error } = await confirmAccount(token as string);
      if (!error) {
        setConfirmed(true);
        router.push({ pathname: '/api/signin', query: {} });
      }
    })();
  }, []);

  return (
    <div className='page signin'>
      <Head>
        <title>Squeaky / Log in</title>
      </Head>
      <Container className='sm'>
        <Card>
          <Link href='/'>
            <a className='logo'>
              <Image src='/logo.svg' height={76} width={246} />
            </a>
          </Link>

          <h2>Log In</h2>

          {confirmed && (
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
                  ? <span>You have made too many failed log in attempts. Please retry in 10 minutes or contact us.</span>
                  : <span>Email and password combination not recognised. <b>{MAX_ATTEMPTS - attemps} attempts remaining</b>.</span>
              }
            />
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                if (exceeded) return;

                const { error } = await signin(values);

                setSubmitting(false);

                if (error) {
                  setFailed(true);
                  return incrAttempt();
                }

                clearAttempt();
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

                <Button type='submit' disabled={isSubmitting} className='primary'>
                  Log in
                </Button>
              </form>
            )}
          </Formik>
        </Card>
      </Container>

      <div className='footer-link'>
        <p>New to Squeaky? <Link href='/auth/signup'><a>Sign up</a></Link></p>
      </div>
    </div>
  );
};

export default Signin;
export { getServerSideProps };
