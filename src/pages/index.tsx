import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { Footer } from 'components/public/footer';
import { Features } from 'components/public/features';
import { Container } from 'components/container';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BASE_PATH } from 'data/common/constants';


const SigupSchema = Yup.object().shape({ 
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
});

const Home: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Squeaky.ai | Better Web Analytics</title>
      </Head>

      <div className='header'>
        <Container className='xl centered'>
          {user
            ? <span>Welcome back, <Link href='/sites'><a>Go to app</a></Link></span>
            : <span>Already have an account? <Link href='/auth/login'><a>Log in</a></Link>.</span>
          }
        </Container>
      </div>

      <section className='hero'>
        <Image src={`${BASE_PATH}/logo.svg`} alt='Logo' height={48} width={154} />
        <h1>Understand your users</h1>
        <p>We’re building a tool that captures screen recordings and data to let you see <b>exactly how visitors are using your website or app</b>.</p>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={SigupSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              setSubmitting(false);
              router.push(`/auth/signup?email=${values.email}`);
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
            <form className='signup-form' onSubmit={handleSubmit}>
              <fieldset>
                <Input
                  name='email' 
                  type='email' 
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='Enter your email...'
                  value={values.email}
                  invalid={touched.email && !!errors.email}
                />
                <span className='validation'>{errors.email}</span>
              </fieldset>
              <Button disabled={isSubmitting} type='submit' className='primary'>
                Get Early Access
              </Button>

              <div className='pointer'>
                <span className='image'>
                  <Image src={`${BASE_PATH}/pointer.svg`} height={28} width={28} />
                </span>
                <i>Free during beta testing</i> 😍
              </div>
            </form>
          )}
        </Formik>
      </section>

      <section className='features'>
        <h2>Sneak Preview</h2>
        <p>You don’t need to give use your email address to see what to expect, here’s a snapshot of <b>the features we’ve already released</b>:</p>

        <Features />
      </section>

      <Footer />
    </>
  );
};

export default Home;
export { getServerSideProps };
