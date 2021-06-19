import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Label } from '../../../components/label';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Tabs } from '../../../components/sites/tabs';
import { Message } from '../../../components/message';
import { Main } from '../../../components/main';
import { Drawer } from '../../../components/drawer';
import { Access } from '../../../components/sites/access';
import { OWNER, ADMIN } from '../../../data/teams/constants';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { deleteSite } from '../../../lib/api/graphql';
import { updateSite } from '../../../lib/api/graphql';
import { getTeamMember } from '../../../lib/sites';
import { useToasts } from '../../../hooks/toasts';
import { useSite } from '../../../hooks/sites';

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  url: Yup.string().required('Site URL is required')
});

const SitesSettings: NextPage<ServerSideProps> = ({ user }) => {
  const toast = useToasts();
  const router = useRouter();
  const [loading, site] = useSite();

  const member = getTeamMember(site, user);

  const siteDelete = async () => {
    const { error } = await deleteSite({ siteId: site.id });
    
    if (error) {
      toast.add({ type: 'error', body: 'There was an unexpected error deleting your site' });
    } else {
      toast.add({ type: 'success', body: 'Site deleted' });
      await router.push('/sites');
    }
  };

  return (
    <div className='page settings'>
      <Head>
        <title>Squeaky / Site Settings</title>
      </Head>

      <Header />

      {!loading && site && (
        <Main>
          <Tabs site={site} user={user} page='settings' />
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
          <Drawer title='Tracking code'>
            <Container className='md'>
              {!site.verifiedAt && (
                <>
                  <Message
                    type='info'
                    message='Your tracking code is not yet verified. Please following the instructions below to start using Squeaky on your site.'
                  />

                  <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} target='_blank'>{site.url}</a>.</p>
                  <p>This enables Squeaky to anonymously capture user behaviour, giving you valuable insights into their experience on your site.</p>

                  <Label>
                    Tracking code
                    <Button className='link icon'>
                      <i className='ri-file-copy-line' />
                      Copy to clipboard
                    </Button>
                  </Label>
                  <pre className='code block'>
                    <code>
{`<!-- Squeaky Tracking Code for ${site.url} -->
<script>
  (function(s,q,e,a,u,k,y){
    s._sqSettings={site_id:'${site.uuid}'};
    u=q.getElementsByTagName('head')[0];
    k=q.createElement('script');k.async=1;
    k.src=e+s._sqSettings.site_id;
    u.appendChild(k);
  })(window,document,'https://cdn.squeaky.ai/g/0.1.0/script.js?');
</script>`}
                    </code>
                  </pre>
                  <Button className='primary'>
                    Verify Installation
                  </Button>
                </>
              )}
            </Container>
          </Drawer>
          {member.role === OWNER && (
            <Drawer title='Site deletion' aside={<Access roles={[OWNER]} />}>
              <Container className='md'>
                <p><b>You can delete your site at any time:</b></p>
                <ul className='delete-list'>
                  <li>Deleting your site will not delete your Squeaky user account. To delete you account please visit the account settings page.</li>
                  <li>Site deletion is irreversable. If you have an active subscription you can downgrade to a free plan in the subscription tab.</li>
                </ul>
                <Button className='tertiary' onClick={siteDelete}>
                  Delete Site
                </Button>
              </Container>
            </Drawer>
          )}
        </Main>
      )}
    </div>
  );
};

export default SitesSettings;
export { getServerSideProps };
