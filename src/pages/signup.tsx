import { Formik } from 'formik';
import { NextPage } from 'next';
import React from 'react';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Box from 'components/Box';
import Stack from 'components/Stack';
import TextInput from 'components/TextInput';

const SignupPage: NextPage = () => (
  <Stack modCenter modFullHeight>
    <Box modNarrow>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log({ values });
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Stack>
              <Stack.Item modSpaceLarge>
                <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
              </Stack.Item>
              <Heading modFormHeading modSpaceAfter>
                Sign Up
              </Heading>
              <Stack.Item>
                <TextInput
                  labelText="Email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="e.g. sam@domain.ext"
                  type="email"
                  value={values.email}
                />
              </Stack.Item>
              <Button type="submit" modFullWidth disabled={isSubmitting}>
                Continue
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  </Stack>
);

export default SignupPage;
