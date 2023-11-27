import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from 'components/container';
import { Radio } from 'components/radio';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER, ADMIN } from 'data/teams/constants';
import { Tooltip } from 'components/tooltip';
import { PageProps } from 'types/page';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { updateSite } from 'lib/api/graphql';
import { HOSTNAME_REGEX } from 'data/sites/constants';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { useToasts } from 'hooks/use-toasts';
import { SiteType } from 'types/sites';
import { Icon } from 'components/icon';

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
  siteType: Yup.number().required('Site type is required'),
});

const SitesSettingsDetails: NextPage<PageProps> = ({ user }) => {
  const toast = useToasts();

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Site Details</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Settings' }, { name: 'Details' }]} />

            <h4 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <SettingsTabs site={site} page='details' member={member} />

            <h4>Site details</h4>

            <Formik
              initialValues={{ name: site.name, hostname: site.url.split('://')[1], siteType: site.siteType }}
              validationSchema={DetailsSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                (async () => {
                  try {
                    const { name, hostname, siteType } = values;

                    // Some people paste the whole url in with the protocol
                    // so we strip it and update the field
                    const host = hostname.replace(/^https?:\/\//, '');

                    const url = `https://${host}`;

                    if (url.includes('localhost')) {
                      return setErrors({ hostname: 'Localhost domains are not supported' });
                    }

                    if (!validateUrl(url)) {
                      return setErrors({ hostname: 'URL must be a valid hostname' });
                    }

                    await updateSite({ siteId: site.id, name, url, siteType });

                    if (url !== site.url) {
                      toast.add({ type: 'error', body: 'Please note, your tracking code will need to be updated as you\'ve changed your URL.' });
                    }

                    toast.add({ type: 'success', body: 'Your site changes have been successfully saved.' });
                  } catch(error: any) {
                    console.error(error);

                    if (/already registered/.test(error)) {
                      setErrors({ hostname: 'This site is already registered' });
                    } else {
                      toast.add({ type: 'error', body: 'There was an error updating your site' });
                    }
                  } finally {
                    setSubmitting(false);
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
                setFieldValue,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Container className='xsm'>
                    <Label htmlFor='name'>Site Name</Label>
                    <Input
                      name='name' 
                      type='text' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='e.g. My Website'
                      autoComplete='off'
                      value={values.name}
                      invalid={touched.name && !!errors.name}
                    />
                    <span className='validation'>{errors.name}</span>

                    <Label htmlFor='hostname'>Site URL</Label>
                    <div className='thirds-input-group'>
                      <Input
                        readOnly
                        disabled
                        value='https://'
                      />
                      <Input
                        name='hostname' 
                        type='text' 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder='e.g. www.mywebsite.com'
                        autoComplete='off'
                        value={values.hostname}
                        invalid={touched.hostname && !!errors.hostname}
                      />
                      <span className='validation'>{errors.hostname}</span>
                    </div>

                    <Label>Site Type</Label>
                    <div className='radio-group'>
                      <Radio
                        name='siteType'
                        value={SiteType.Website}
                        onChange={() => setFieldValue('siteType', SiteType.Website)}
                        checked={values.siteType === SiteType.Website}
                      >
                        Website
                        <Tooltip button={<Icon name='information-line' />} portalClassName='site-type-tooltip'>
                          <p>Websites are typically created for people wanting to source information, consume content, or make purchases.</p>
                          <p><b>Examples include:</b></p>
                          <ul>
                            <li>Marketing and sales websites</li>
                            <li>eCommerce stores</li>
                            <li>News media</li>
                            <li>Blogs</li>
                            <li>Personal websites</li>
                          </ul>
                        </Tooltip>
                      </Radio>
                      <Radio
                        name='siteType'
                        value={SiteType.WebApp}
                        onChange={() => setFieldValue('siteType', SiteType.WebApp)}
                        checked={values.siteType === SiteType.WebApp}
                      >
                        Web app
                        <Tooltip button={<Icon name='information-line' />} portalClassName='site-type-tooltip'>
                          <p>Web apps are interactive sites that are similar to conventional software programs but accessible using your web browser.</p>
                          <p>Examples include:</p>
                          <ul>
                            <li>Email clients</li>
                            <li>Project management software</li>
                            <li>Cloud storage systems</li>
                            <li>Document and spreadsheet tools</li>
                            <li>This app you&apos;re using now!</li>
                          </ul>
                        </Tooltip>
                      </Radio>
                    </div>

                    <Button type='submit' disabled={isSubmitting} className='primary'>
                      Save Changes
                    </Button>
                  </Container>
                </form>
              )}
            </Formik>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsDetails;
