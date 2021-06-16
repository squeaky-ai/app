import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { userInvitation, teamInviteAccept } from '../../lib/api/graphql';
import { Container } from '../../components/container';
import { Card } from '../../components/card';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Password } from '../../components/password';
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

  React.useEffect(() => {
    if (router.query.token) {
      (async () => {
        const user = await userInvitation(router.query.token as string);
        
        if (user) {
          setEmail(user.email);
        }
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

          {email && (
            <>
              <h2>Reset Password</h2>

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
                      Reset Password
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
