import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
import { updateSite } from 'lib/api/graphql';
import { HOSTNAME_REGEX } from 'data/sites/constants';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { useToasts } from 'hooks/use-toasts';

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
  protocol: Yup.string().oneOf(['http://', 'https://'], 'Please select a protocol')
});

const SitesSettingsDetails: NextPage<ServerSideProps> = ({ user }) => {
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
            <BreadCrumbs site={site} items={[{ name: 'Settings' }, { name: 'Details' }]} />

            <h3 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} page='details' member={member} />

            <h4>Site details</h4>

            <Formik
              initialValues={{ name: site.name, protocol: `${site.url.split('://')[0]}://`, hostname: site.url.split('://')[1] }}
              validationSchema={DetailsSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                (async () => {
                  try {
                    const { name, protocol, hostname } = values;
                    const url = `${protocol}${hostname}`;

                    if (!validateUrl(url)) {
                      return setErrors({ 'hostname': 'URL must be a valid hostname' });
                    }

                    if (url !== site.url) {
                      toast.add({ type: 'error', body: 'Please note, your tracking code will need to be updated as you’ve changed your URL.' });
                    }

                    await updateSite({ siteId: site.id, name, url });
                    setSubmitting(false);

                    toast.add({ type: 'success', body: 'Your site changes have been successfully saved.' });
                  } catch(error) {
                    console.error(error);
                    toast.add({ type: 'error', body: 'There was an error updating your site' });
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
                      placeholder='e.g. My Webite'
                      value={values.name}
                      invalid={touched.name && !!errors.name}
                    />
                    <span className='validation'>{errors.name}</span>

                    <Label htmlFor='hostname'>Site URL</Label>
                    <div className='select-input-group'>
                      <Select name='protocol' onChange={handleChange} value={values.protocol} invalid={touched.protocol && !!errors.protocol}>
                        <Option value='https://'>https://</Option>
                        <Option value='http://'>http://</Option>
                      </Select>
                      <Input
                        name='hostname' 
                        type='text' 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder='e.g. www.mywebsite.com'
                        value={values.hostname}
                        invalid={touched.hostname && !!errors.hostname}
                      />
                      <span className='validation'>{errors.hostname}</span>
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
export { getServerSideProps };
