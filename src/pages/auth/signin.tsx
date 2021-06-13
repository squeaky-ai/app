import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from '../../components/container';
import { Card } from '../../components/card';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from 'components/button';

const Schema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Signin: NextPage = () => (
  <div className='page signin'>
    <Container className='sm'>
      <Card>
        <Link href='/'>
          <a className='logo'>
            <Image src='/logo.svg' height={76} width={246} />
          </a>
        </Link>

        <h2>Log In</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Schema}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            console.log(values);
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
                <Link href='#'>
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

export default Signin;
