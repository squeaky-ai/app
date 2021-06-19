import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { signout } from '../../lib/api/auth';
import { userInvitation, teamInviteAccept } from '../../lib/api/graphql';
import { Container } from '../../components/container';
import { Card } from '../../components/card';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Password } from '../../components/password';
import { Message } from '../../components/message';
import { Spinner } from '../../components/spinner';
import { ServerSideProps, getServerSideProps } from '../../lib/auth';
import { useToasts } from '../../hooks/toasts';

const AcceptSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must agree to the terms')
});

const Accept: NextPage<ServerSideProps> = () => {
  const toast = useToasts();
  const router = useRouter();
  const [email, setEmail] = React.useState<string>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (router.query.token) {
      (async () => {
        const newUser = router.query.new_user !== 'false';

        // If they are already logged in then it will be confusing
        // when they log in as a different user to their current
        // session
        await signout();

        const user = await userInvitation(router.query.token as string);
        
        // New users need to finish off creating their account
        if (user && newUser) setEmail(user.email);

        // Existing users can accept straight away and go to 
        // the login page
        if (user && !newUser) {
          const { error } = await teamInviteAccept({ token: router.query.token as string });

          if (!error) {
            toast.add({ type: 'success', body: 'Invitation accepted' });
            await router.push('/auth/signin');
            return;
          }
        }

        setLoading(false);
      })();
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
              <Image src='/logo.svg' height={76} width={246} />
            </a>
          </Link>

          {loading && (
            <Spinner />
          )}

          {!loading && !email && (
            <div className='invalid-invidation'>
              <Message 
                type='error'
                message='There is a problem with your invitation, please contact the site owner'
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
                      toast.add({ type: 'info', body: 'Invitation accepted succesfully' });
                      await router.push('/auth/signin');
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
                      I have read and accept the <a href='#TODO'>Terms Of Use</a>
                    </Checkbox>
                    <span className='validation'>{errors.terms}</span>

                    <Button  type='submit' disabled={isSubmitting} className='primary'>
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
