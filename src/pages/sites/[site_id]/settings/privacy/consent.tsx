import React from 'react';
import type { NextPage } from 'next';
import * as Yup from 'yup';
import Head from 'next/head';
import { uniq } from 'lodash';
import { Formik } from 'formik';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Checkbox } from 'components/checkbox';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Container } from 'components/container';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PrivacyTabs } from 'components/sites/settings/privacy-tabs';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useToasts } from 'hooks/use-toasts';
import { countryNames } from 'types/translations';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

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

            <Container className='md consent'>
              <h4>Visitor Consent</h4>

              <p>One of the great advantages of Squeaky is that <b>we&apos;re a privacy-first analytics solution</b>, we&apos;re cookieless, and we don&apos;t use IP to track your visitors, and we allow you to avoid capturing any senstive data if you so wish. This means that <b>in many cases you will not need to gain the consent of your visitors</b> using consent banners and pop-ups.</p>
              <p>That said, <b>depending on the location and function of your business, along with the ways and types of data you collect from your visitors, you may need to ask for their consent prior to capturing data</b> with Squeaky. We provide a few options to support you in consent capture and we&apos;ve outlined them below.</p>
              <p><b>Please note</b>: We always recommend our customers seek professional legal advice when determing the appropriate privacy, consent and compliance requirements for their business.</p>

              <Formik
                initialValues={{ 
                  name: site.name,
                  privacyPolicyUrl: `${site.url}/privacy`,
                  layout: 'bottom_left',
                  languages: ['en'],
                  languagesDefault: 'en',
                  consentMethod: 'disabled',
                }}
                validationSchema={ConsentSchema}
                onSubmit={(values, { setSubmitting }) => {
                  (async () => {
                    try {
                      console.log(values);
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
                      <Card>
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

                        <Label>Consent languages</Label>
                        <p>If you have visitors that are using a different primary language then you may wish to adjust the consent widget accordingly. Please check the boxes before for any languages you&apos;d like to include and we will show them these languages if they match the visitor&apos;s browser or device settings.</p>
                      
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

                        <p>If you&apos;d like to request an additional langauge be added to our consent surveys then please contact us via email using <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>

                        <Label htmlFor='layout'>Layout</Label>
                        <p>Where would you like your consent widget to appear?</p>
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

                        <Button type='button' className='secondary preview'>
                          <Icon name='search-line' />
                          Preview
                        </Button>
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
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacyConsent;
export { getServerSideProps };
