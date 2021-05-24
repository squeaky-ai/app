import { Formik } from 'formik';
import type { GetStaticProps, NextPage } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Box from 'components/Box';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Logo from 'components/Logo';
import SEO from 'components/SEO';
import SqueakyPage from 'components/SqueakyPage';
import SqueakyPattern from 'components/SqueakyPattern';
import { useSqueaky } from 'components/SqueakyProvider';
import Stack from 'components/Stack';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import { useUniqueId } from 'components/UniqueId';

const SignupPage: NextPage = () => {
  const api = useSqueaky();
  const { push } = useRouter();
  const { t } = useTranslation('common');
  const [emailCodeStep, setEmailCodeStep] = useState(false);
  const [moveFocus, setMoveFocus] = useState(false);
  const pageId = useUniqueId();
  const emailCodeElementId = `emailCode${pageId}`;

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(t('form.invalid.email')).required(t('required')),
  });

  /**
   * This effect aims to move the focus to the message indicating that we sent
   * an email with a code when it is appearing on the screen
   */
  useEffect(() => {
    if (!emailCodeStep || !moveFocus) return;

    const textElement = document.querySelector<HTMLElement>(`[id="${emailCodeElementId}"]`);
    if (!textElement) return;

    textElement.focus();
    setMoveFocus(false);
  }, [emailCodeElementId, emailCodeStep, moveFocus]);

  return (
    <SqueakyPage isPublic noHeader>
      <SEO title={t('signup')} />
      <SqueakyPattern modFullPage />
      <Stack modCenter modFullHeight>
        <Stack.Item>
          <Box modNarrow>
            <Formik
              initialValues={{ code: '', email: '' }}
              onSubmit={(values, { setErrors, setSubmitting }) => {
                (async () => {
                  // early-termination if it's the first step, by moving to the second one
                  if (!emailCodeStep) {
                    // requests an auth email for the requested email
                    const response = await api.requestAuth('SIGNUP', values.email);

                    // enables the submit button again
                    setSubmitting(false);

                    // early-termination if it works, going to the next step
                    if (response) {
                      setEmailCodeStep(true);
                      setMoveFocus(true);

                      return;
                    }

                    // if the answer was null, we throw a form error
                    return setErrors({ email: t('form.invalid.accountMissing') });
                  }

                  // on 2nd step, verifies with backend the validity of the auth token
                  const response = await api.verifyAuth(values.email, values.code);

                  // early-termination if the code is not valid with an error and the reactivation of the submit button
                  if (!response) {
                    setSubmitting(false);

                    return setErrors({ code: t('form.invalid.code') });
                  }

                  // redirect to home
                  void push('/sites');
                })();
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
                        <Text id={emailCodeElementId} modSpaceAfter tabIndex={-1}>
                          {t('emailCode.signupExplaination')}
                        </Text>
                        <TextInput
                          error={touched.code && errors.code}
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
    </SqueakyPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default SignupPage;
