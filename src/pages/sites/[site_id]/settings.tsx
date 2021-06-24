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
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { updateSite } from 'lib/api/graphql';
import { useToasts } from 'hooks/toasts';

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  url: Yup.string().required('Site URL is required')
});

const SitesSettings: NextPage<ServerSideProps> = ({ user }) => {
  const toast = useToasts();

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
                  initialValues={{ name: site.name, url: site.url }}
                  validationSchema={DetailsSchema}
                  onSubmit={(values, { setSubmitting, setErrors }) => {
                    (async () => {
                      const { error } = await updateSite({ siteId: site.id, ...values });
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

                        <Label htmlFor='url'>Site URL</Label>
                        <Input
                          name='url' 
                          type='url' 
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder='e.g. www.mywebsite.com'
                          value={values.url}
                          invalid={touched.url && !!errors.url}
                        />
                        <span className='validation'>{errors.url}</span>

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
                    ? <span className='verified-badge'><i className='ri-checkbox-circle-line' />Verified and active</span> 
                    : null
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

                  {site.verifiedAt && (
                    <p>You can paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on any page that you wish to track on <a href={site.url} target='_blank'>{site.url}</a>.</p>
                  )}

                  <TrackingCode site={site} />

                  {!site.verifiedAt && (
                    <Verify site={site} />
                  )}
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
