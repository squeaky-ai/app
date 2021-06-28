import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from 'components/container';
import { Header } from 'components/sites/header';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Tabs } from 'components/sites/tabs';
import { Message } from 'components/message';
import { Main } from 'components/main';
import { Drawer } from 'components/drawer';
import { Access } from 'components/sites/access';
import { DeleteSite } from 'components/sites/delete-site';
import { Verify } from 'components/sites/verify';
import { TrackingCode } from 'components/sites/tracking-code';
import { Page } from 'components/sites/page';
import { Option, Select } from 'components/select';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { updateSite } from 'lib/api/graphql';
import { HOSTNAME_REGEX, MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import { useToasts } from 'hooks/toasts';

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
  protocol: Yup.string().oneOf(['http://', 'https://'], 'Please select a protocol')
});

const SitesSettings: NextPage<ServerSideProps> = ({ user }) => {
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
    <div className='page settings'>
      <Head>
        <title>Squeaky / Site Settings</title>
      </Head>

      <Header />

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <>
            <Tabs site={site} member={member} page='settings' />

            <Main>
              <h3 className='title'>
                Settings
                <Access roles={[OWNER, ADMIN]} />
              </h3>

              <Drawer title='Site details'>
                <Formik
                  initialValues={{ name: site.name, protocol: `${site.url.split('://')[0]}://`, hostname: site.url.split('://')[1] }}
                  validationSchema={DetailsSchema}
                  onSubmit={(values, { setSubmitting, setErrors }) => {
                    (async () => {
                      const { name, protocol, hostname } = values;
                      const url = `${protocol}${hostname}`;

                      if (!validateUrl(url)) {
                        return setErrors({ 'hostname': 'URL must be a valid hostname' });
                      }

                      if (url !== site.url) {
                        toast.add({ type: 'error', body: 'Please note, your tracking code will need to be updated as you’ve changed your URL.' });
                      }

                      const { error } = await updateSite({ siteId: site.id, name, url });
                      setSubmitting(false);

                      if (error) {
                        const [key, value] = Object.entries(error)[0];
                        setErrors({ [key]: value });
                      } else {
                        toast.add({ type: 'success', body: 'Your site changes have been successfully saved.' });
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
              </Drawer>
              <Drawer 
                title='Tracking code' 
                aside={
                  site.verifiedAt 
                    ? site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE
                      ? <span className='warning-badge'><i className='ri-error-warning-line' />Potential Issue</span> 
                      : <span className='verified-badge'><i className='ri-checkbox-circle-line' />Verified and active</span> 
                    : <span className='unverified-badge'><i className='ri-error-warning-line' />Inactive</span> 
                }
              >
                <Container className='md'>
                  {!site.verifiedAt && (
                    <>
                      <Message
                        type='info'
                        message='Your tracking code is not yet verified. Please following the instructions below to start using Squeaky on your site.'
                      />

                      <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} target='_blank'>{site.url}</a>.</p>
                      <p>This enables Squeaky to anonymously capture user behaviour, giving you valuable insights into their experience on your site.</p>
                    </>
                  )}

                  {site.verifiedAt && site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE && (
                    <>
                      <Message
                        type='warning'
                        message={<span><a target='_blank' href={site.url}>{site.url}</a> <b>has not sent any data in the past {site.daysSinceLastRecording} days</b>, there might be an issue with your tracking code. You can check your installation using the button below.</span>}
                      />

                      <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} target='_blank'>{site.url}</a>.</p>
                    </>
                  )}
          

                  {site.verifiedAt && site.daysSinceLastRecording < MAX_DAYS_BEFORE_POTENTIAL_ISSUE && (
                    <p>You can paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on any page that you wish to track on <a href={site.url} target='_blank'>{site.url}</a>.</p>
                  )}

                  <TrackingCode site={site} />

                  <Verify site={site} />
                </Container>
              </Drawer>
              {member.role === OWNER && (
                <Drawer title='Site deletion' aside={<Access roles={[OWNER]} />}>
                  <Container className='md'>
                    <p><b>You can delete your site at any time:</b></p>
                    <ul className='delete-list'>
                      <li>The site will be deleted immediately for all users.</li>
                      <li>Deleting your site will not delete your Squeaky user account. To delete you account please visit the <Link href='/users/account'><a>account settings page</a></Link>.</li>
                      <li>Site deletion is irreversable. If you have an active subscription you can downgrade to a free plan in the <Link href={`/sites/${site.id}/subscription`}><a>subscription tab</a></Link>.</li>
                    </ul>
                    <DeleteSite site={site} />
                  </Container>
                </Drawer>
              )}
            </Main>
          </>
        )}
      </Page>
    </div>
  );
};

export default SitesSettings;
export { getServerSideProps };
