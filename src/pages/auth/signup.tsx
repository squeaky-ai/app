import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { Container } from 'components/container';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button, DelayedButton } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Message } from 'components/message';
import { Password } from 'components/password';
import { PASSWORD_REGEX } from 'data/users/constants';
import { emailExists, signup, reconfirmAccount } from 'lib/api/auth';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useToasts } from 'hooks/use-toasts';
import { BASE_PATH } from 'data/common/constants';

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
  password: Yup.string().matches(PASSWORD_REGEX, 'Password must match the criteria defined below').required('Password is required')
});

const Signup: NextPage<ServerSideProps> = () => {
  const toasts = useToasts();
  const router = useRouter();
  const [pageView, setPageView] = React.useState(PageView.EMAIL);
  const [email, setEmail] = React.useState<string>(null);

  const resendConfirmation = async () => {
    const { error } = await reconfirmAccount(email);

    error
      ? toasts.add({ type: 'error', body: 'There was an issue resending the verification email' })
      : toasts.add({ type: 'success', body: 'Verification email send successfully' });
  };

  return (
    <>
      <Head>
        <title>Squeaky | Sign up</title>
      </Head>

      <div className='center'>
        <Container className='sm'>
          <Card>
            <a href='/' className='logo'>
              <Image src={`${BASE_PATH}/logo.svg`} height={76} width={246} alt='Squeaky logo' />
            </a>

            {pageView === PageView.EMAIL && (
              <>
                <h2>Sign Up</h2>
                <Formik
                  initialValues={{ email: (router.query.email || '') as string, terms: false }}
                  validationSchema={EmailSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    (async () => {
                      const { body } = await emailExists(values.email);
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

                      <Checkbox name='terms' onChange={handleChange} checked={values.terms} invalid={touched.terms && !!errors.terms}>
                        I have read and accept the <Link href='/terms'><a target='_blank'>Terms Of Use</a></Link>
                      </Checkbox>
                      <span className='validation'>{errors.terms}</span>

                      <Button type='submit' disabled={isSubmitting || !(dirty && isValid)} className='primary'>
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
                    isValid,
                    dirty,
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

                      <Button type='submit' disabled={isSubmitting || !(dirty && isValid)} className='primary'>
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
                <Link href='/auth/login'>
                  <a className='button primary'>Go To Login Page</a>
                </Link>
                <Button className='secondary' onClick={() => setPageView(PageView.EMAIL)}>
                  Sign Up With A Different Email
                </Button>
              </div>
            )}

            {pageView === PageView.VERIFY && (
              <div className='verify'>
                <div className='check'>
                  <i className='ri-check-line' />
                </div>
                <h4>Sign Up Complete</h4>
                <p>To log in to your account, please open the verification email sent to <b>{email}</b> and click the link provided.</p>
                <DelayedButton delay={10} initialDelayed={false} className='secondary' onClick={resendConfirmation}>
                  Resend Verification Email
                </DelayedButton>
              </div>
            )}
          </Card>
        </Container>

        <div className='footer-link'>
          <p>Already have an account? <Link href='/auth/login'><a>Log in</a></Link></p>
        </div>
      </div>
    </>
  ); 
};

export default Signup;
export { getServerSideProps };
