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
import SqueakyPattern from 'components/SqueakyPattern';
import { useSqueaky } from 'components/SqueakyProvider';
import Stack from 'components/Stack';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import { useUniqueId } from 'components/UniqueId';
import ValidationMessage from 'components/ValidationMessage';

const LoginPage: NextPage = () => {
  const api = useSqueaky();
  const { push } = useRouter();
  const { t } = useTranslation('common');
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [emailCodeStep, setEmailCodeStep] = useState(false);
  const [moveFocus, setMoveFocus] = useState(false);
  const pageId = useUniqueId();
  const emailCodeElementId = `emailCode${pageId}`;

  const LoginSchema = Yup.object().shape({
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
    <>
      <SEO title={t('login')} />
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
                    const response = await api.requestAuth('LOGIN', values.email);

                    // early-termination if it works, going to the next step
                    if (response) {
                      setEmailCodeStep(true);
                      setMoveFocus(true);
                      setSubmitting(false);

                      return;
                    }

                    // if the answer was null, we decrease the amount of attempts left
                    const updatedAttemptsLeft = Math.max(attemptsLeft - 1, 0);
                    setAttemptsLeft(attemptsLeft - 1);
                    console.log(updatedAttemptsLeft);
                    console.log(updatedAttemptsLeft > 0);

                    // enables the submit button again if there is some attempts left
                    if (updatedAttemptsLeft > 0) setSubmitting(false);

                    return;
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
              validationSchema={LoginSchema}
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
                      {t('login')}
                    </Heading>
                    {attemptsLeft < 10 && (
                      <Stack.Item>
                        <ValidationMessage>
                          {t('form.invalid.accountMissing', { count: attemptsLeft })}
                        </ValidationMessage>
                      </Stack.Item>
                    )}
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
                          {t('emailCode.loginExplaination')}
                        </Text>
                        <TextInput
                          error={touched.code && errors.code}
                          inputMode="numeric"
                          labelText={t('emailCode.login')}
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
            <Trans i18nKey="redirect.signup">
              Text <a href="/signup">Link</a>.
            </Trans>
          </Text>
        </Stack.Item>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default LoginPage;
