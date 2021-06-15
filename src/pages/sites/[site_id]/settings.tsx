import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Label } from '../../../components/label';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Tabs } from '../../../components/sites/tabs';
import { Drawer } from '../../../components/drawer';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { updateSite } from '../../../lib/api/graphql';
import { useToasts } from '../../../hooks/toasts';
import { useSite } from '../../../hooks/sites';

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  url: Yup.string().required('Site URL is required')
});

const SitesSettings: NextPage<ServerSideProps> = () => {
  const toast = useToasts();
  const [loading, site] = useSite();

  return (
    <div className='page settings'>
      <Head>
        <title>Squeaky / Site Settings</title>
      </Head>

      <Header />

      {!loading && site && (
        <Container className='lg centered'>
          <Tabs site={site} page='settings' />
          <h3>Settings</h3>
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
            <p>!!</p>
          </Drawer>
          <Drawer title='Site deletion'>
            <p>!!</p>
          </Drawer>
        </Container>
      )}
    </div>
  );
};

export default SitesSettings;
export { getServerSideProps };
