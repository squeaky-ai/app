import { Formik } from 'formik';
import { NextPage } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Logo from 'components/Logo';
import Box from 'components/Box';
import Stack from 'components/Stack';
import TextInput from 'components/TextInput';
import SEO from 'components/SEO';
import SqueakyPattern from 'components/SqueakyPattern';
import Text from 'components/Text';

const SignupPage: NextPage = () => {
  const { t } = useTranslation('common');
  const [emailCodeStep, setEmailCodeStep] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(t('form.invalid.email')).required(t('required')),
  });

  return (
    <>
      <SEO title={t('signup')} />
      <SqueakyPattern modFullPage />
      <Stack modCenter modFullHeight>
        <Stack.Item>
          <Box modNarrow>
            <Formik
              initialValues={{ code: '', email: '' }}
              onSubmit={(_values, { setSubmitting }) => {
                setTimeout(() => {
                  setEmailCodeStep(!emailCodeStep);
                  setSubmitting(false);
                }, 1000);
              }}
              validationSchema={SignupSchema}
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
                  <Stack>
                    <Stack.Item modSpaceLarge>
                      <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
                    </Stack.Item>
                    <Heading modFormHeading modSpaceAfter>
                      {t('signup')}
                    </Heading>
                    <TextInput
                      error={touched.email && errors.email}
                      inputMode="email"
                      labelText={t('email')}
                      modSpaceAfter
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t('placeholder.email')}
                      type="email"
                      value={values.email}
                    />
                    {emailCodeStep && (
                      <>
                        <Text modSpaceAfter>{t('emailCode.signupExplaination')}</Text>
                        <TextInput
                          inputMode="numeric"
                          labelText={t('emailCode.signup')}
                          maxLength={6}
                          minLength={6}
                          modSpaceAfter
                          name="code"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.code}
                        />
                      </>
                    )}
                    <Button type="submit" modFullWidth disabled={isSubmitting}>
                      {t('continue')}
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </Box>
          <Text modCenter modWideSpaceBefore>
            <Trans i18nKey="redirect.login">
              Text <a href="/login">Link</a>.
            </Trans>
          </Text>
        </Stack.Item>
      </Stack>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default SignupPage;
