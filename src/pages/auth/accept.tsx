import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Container } from 'components/container';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Password } from 'components/password';
import { Message } from 'components/message';
import { Spinner } from 'components/spinner';
import { PASSWORD_REGEX } from 'data/users/constants';
import { signout } from 'lib/api/auth';
import { userInvitation, teamInviteAccept } from 'lib/api/graphql';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useToasts } from 'hooks/toasts';

const AcceptSchema = Yup.object().shape({
  password: Yup.string().matches(PASSWORD_REGEX, 'Password must match the criteria defined below').required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must agree to the terms')
});

const Accept: NextPage<ServerSideProps> = ({ user }) => {
  const toast = useToasts();
  const router = useRouter();
  const [email, setEmail] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (router.query.token) {
      (async () => {
        const newUser = router.query.new_user !== 'false';

        const invitation = await userInvitation(router.query.token as string);

        if (user && user.email !== invitation.email) {
          // If they are already logged in to a different account
          // then they need to be logged out first
          await signout();
        }

        if (invitation.hasPending) {
          // New users need to finish off creating their account
          setEmail(invitation.email);

          // Existing users can accept straight away and go to 
          // the login page or the site page
          if (!newUser) {
            const { error } = await teamInviteAccept({ token: router.query.token as string });

            if (!error) {
              toast.add({ type: 'success', body: 'Invitation accepted' });

              return user
                ? await router.push('/sites')
                : await router.push('/auth/login');
            }
          }
        }

        return setLoading(false);
      })();
    } else {
      // They've visited the page with no token so there's nothing
      // we can do for them
      setLoading(false);
    }
  }, []);

  return (
    <div className='page accept'>
      <Head>
        <title>Squeaky / Accept Invitation</title>
      </Head>
      <Container className='sm'>
        <Card>
          <Link href='/'>
            <a className='logo'>
              <Image src='/logo.svg' height={76} width={246} alt='Squeaky logo' />
            </a>
          </Link>

          {loading && (
            <Spinner />
          )}

          {!loading && !email && (
            <div className='invalid-invidation'>
              <Message 
                type='error'
                message='Your invitation link is no longer valid, please contact the site owner to request a new invitation'
              />
            </div>
          )}

          {!loading && email && (
            <>
              <h2>Sign Up</h2>

              <Formik
                initialValues={{ password: '', terms: false }}
                validationSchema={AcceptSchema}
                onSubmit={(values, { setSubmitting }) => {
                  (async () => {
                    const { error } = await teamInviteAccept({ password: values.password, token: router.query.token as string });
                    setSubmitting(false);

                    if (error) {
                      toast.add({ type: 'error', body: 'There was an error accepting the invitation' });
                    } else {
                      toast.add({ type: 'success', body: 'Invitation accepted succesfully' });
                      await router.push('/auth/login');
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
                    <Label>Email</Label>
                    <p>{email}</p>

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

                    <Checkbox name='terms' onChange={handleChange} checked={values.terms} invalid={touched.terms && !!errors.terms}>
                      I have read and accept the <a href='/terms' target='_blank'>Terms Of Use</a>
                    </Checkbox>
                    <span className='validation'>{errors.terms}</span>

                    <Button  type='submit' disabled={isSubmitting || !(dirty && isValid)} className='primary'>
                      Sign Up
                    </Button>
                  </form>
                )}
              </Formik>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Accept;
export { getServerSideProps };
