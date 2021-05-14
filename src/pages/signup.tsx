import { Formik } from 'formik';
import { NextPage } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
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

  return (
    <>
      <SEO title={t('signup')} />
      <SqueakyPattern modFullPage />
      <Stack modCenter modFullHeight>
        <Stack.Item>
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
                      {t('signup')}
                    </Heading>
                    <Stack.Item>
                      <TextInput
                        labelText={t('email')}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={t('placeholder.email')}
                        type="email"
                        value={values.email}
                      />
                    </Stack.Item>
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
