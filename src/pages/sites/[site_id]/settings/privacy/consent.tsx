import React from 'react';
import type { NextPage } from 'next';
import * as Yup from 'yup';
import Head from 'next/head';
import classnames from 'classnames';
import { uniq } from 'lodash';
import { Formik } from 'formik';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Icon } from 'components/icon';
import { Error } from 'components/error';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Container } from 'components/container';
import { PageLoading } from 'components/sites/page-loading';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PrivacyTabs } from 'components/sites/settings/privacy-tabs';
import { ConsentPreview } from 'components/sites/settings/consent-preview';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useToasts } from 'hooks/use-toasts';
import { countryNames } from 'types/translations';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { consentUpdate } from 'lib/api/graphql';
import { useConsent } from 'hooks/use-consent';

const ConsentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  privacyPolicyUrl: Yup.string().required('Privacy policy is required'),
  layout: Yup.string().oneOf(['bottom_left', 'bottom_right', 'center']),
  consentMethod: Yup.string().oneOf(['disabled', 'api', 'widget']),
  languages: Yup.array(),
  languagesDefault: Yup.string().required('A default language is required'),
});

const SitesSettingsPrivacyConsent: NextPage<ServerSideProps> = ({ user }) => {
  const toasts = useToasts();
  
  const [showLanguages, setShowLanguages] = React.useState<boolean>(false);

  const { loading, error, consent, locale, setLocale } = useConsent();

  const handleToggleShowLanguages = () => setShowLanguages(!showLanguages);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Privacy</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Privacy' }]} />

            <h4 className='title'>
              Privacy
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <PrivacyTabs site={site} page='consent' />

            {loading && (
              <PageLoading />
            )}

            {!loading && (
              <Container className='md consent'>
                <h4>Visitor Consent</h4>

                <p>Squeaky is a <b>privacy-first analytics solution</b>. We don&apos;t use cookies or IP tracking, and we disable the capture of senstive data by default. This means that <b>typically you won&apos;t need to request visitor consent to use our tool</b> on your site, as you are never compromising their privacy.</p>
                <p>The only time that you do need visitor consent is if you are using Squeaky to capture personal data (e.g. name, date of birth, email address, or postal address). If you are capturing personal data please read our <a href='/legal/gdpr' target='_blank'>GDPR</a> and <a href='/legal/ccpa' target='_blank'>CCPA</a> documentation to understand your obligations.</p>

                <Formik
                  initialValues={{ 
                    name: consent.name || site.name,
                    privacyPolicyUrl: consent.privacyPolicyUrl || `${site.url}/privacy`,
                    layout: consent.layout || 'bottom_left',
                    languages: consent.languages || ['en'],
                    languagesDefault: consent.languagesDefault || 'en',
                    consentMethod: consent.consentMethod || 'disabled',
                  }}
                  validationSchema={ConsentSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    (async () => {
                      try {
                        await consentUpdate({
                          siteId: site.id,
                          name: values.name,
                          layout: values.layout,
                          languages: values.languages,
                          languagesDefault: values.languagesDefault,
                          consentMethod: values.consentMethod,
                          privacyPolicyUrl: values.privacyPolicyUrl,
                        })
                        toasts.add({ type: 'success', body: 'Consent settings updated successfully' });
                      } catch {
                        toasts.add({ type: 'error', body: 'There was an issue updating the settings' });
                      } finally {
                        setSubmitting(false);
                      }
                    })();
                  }}
                >
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    handleReset,
                    setFieldValue,
                    isSubmitting,
                    touched,
                    values,
                    errors,
                    isValid,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Label htmlFor='consentMethod'>Consent Method</Label>
                      <div className='radio-group'>
                        <Radio
                          name='consentMethod'
                          value='disabled'
                          onChange={handleChange}
                          checked={values.consentMethod === 'disabled'}
                        >
                          Consent not required, or using a third-party consent tool
                        </Radio>
                        <Radio
                          name='consentMethod'
                          value='api'
                          onChange={handleChange}
                          checked={values.consentMethod === 'api'}
                        >
                          Manage consent via API (see <a target='_blank' href='/developers'>developer docs</a>)
                        </Radio>
                        <Radio
                          name='consentMethod'
                          value='widget'
                          onChange={handleChange}
                          checked={values.consentMethod === 'widget'}
                        >
                          Use the Squeaky consent widget
                        </Radio>
                      </div>

                      {values.consentMethod === 'widget' && (
                        <Card className='consent-widget'>
                          <p>To use the Squeaky consent widget, please configure the following options:</p>
                          <Container className='xxsm'>
                            <Label htmlFor='name'>Your company name</Label>
                            <Input 
                              type='text'
                              placeholder='e.g. ACME Inc'
                              name='name'
                              autoComplete='off'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              invalid={touched.name && !!errors.name}
                            />
                            <span className='validation'>{errors.name}</span>

                            <Label htmlFor='privacyPolicyUrl'>A link to you Privacy Policy</Label>
                            <Input 
                              type='text'
                              placeholder='e.g. https://acme.com/privacy'
                              name='privacyPolicyUrl'
                              autoComplete='off'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.privacyPolicyUrl}
                              invalid={touched.privacyPolicyUrl && !!errors.privacyPolicyUrl}
                            />
                            <span className='validation'>{errors.privacyPolicyUrl}</span>
                          </Container>
                          <p className='guidance'><a href='/legal/gdpr' target='_blank'>Click here</a> for guidance on GDPR and CCPA compliance with Squeaky.</p>

                          <Label htmlFor='layout'>Widget position</Label>
                          <div className='radio-group'>
                            <Radio
                              name='layout'
                              value='bottom_left'
                              onChange={handleChange}
                              checked={values.layout === 'bottom_left'}
                            >
                              Bottom left
                            </Radio>
                            <Radio
                              name='layout'
                              value='bottom_right'
                              onChange={handleChange}
                              checked={values.layout === 'bottom_right'}
                            >
                              Bottom right
                            </Radio>
                            <Radio
                              name='layout'
                              value='center'
                              onChange={handleChange}
                              checked={values.layout === 'center'}
                            >
                              Center of the page
                            </Radio>
                          </div>

                          <Button type='button' className={classnames('label toggle-languages', { open: showLanguages })} onClick={handleToggleShowLanguages}>
                            Consent languages
                            <Icon name='arrow-drop-down-line' />
                          </Button>
                          <div className={classnames('language-options', { open: showLanguages })}>
                            <p>Please check the boxes for any languages you&apos;d like to include and we will show your visitors the language that matches their browser or device settings. To request an additional language please contact us via email using <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>
                        
                            <div className='languages'>
                              {Object.entries(countryNames).map(([locale, name]) => (
                                <div className='row' key={locale}>
                                  <span className='name'>
                                    <Checkbox
                                      name='languages'
                                      onChange={(event) => {
                                        if (!event.target.checked && locale === values.languagesDefault) {
                                          setFieldValue('languagesDefault', 'en');
                                        }

                                        handleChange(event);
                                      }}
                                      disabled={locale === 'en'}
                                      value={locale}
                                      checked={values.languages.includes(locale)}
                                    >
                                      {name}
                                    </Checkbox>
                                  </span>
                                  <span>
                                    {values.languagesDefault === locale
                                      ? <i>Default</i>
                                      : (
                                          <Button
                                            className='link'
                                            onClick={() => {
                                              setFieldValue('languages', uniq([...values.languages, locale]));
                                              setFieldValue('languagesDefault', locale);
                                            }}
                                          >
                                            Make default
                                          </Button>
                                        )
                                    }
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <ConsentPreview 
                            consent={{ ...consent, ...values }}
                            storedConsent={consent}
                            locale={locale}
                            setLocale={setLocale}
                          />
                        </Card>
                      )}

                      <div className='actions'>
                        <Button disabled={isSubmitting || !isValid} type='submit' className='primary'>
                          Save Changes
                        </Button>

                        <Button className='quaternary' type='button' onClick={handleReset}>
                          Discard Changes
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </Container>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacyConsent;
export { getServerSideProps };
