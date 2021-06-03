import React from 'react';
import type { NextPage } from 'next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SqueakyPage, { PageHeading } from 'components/SqueakyPage';
import { SiteCreateHeader, Tab } from 'components/SiteHeader';
import Wrapper from 'components/Wrapper';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { useSqueaky } from 'components/SqueakyProvider';
import { Site } from 'data/sites/types';

const SitesNew: NextPage = () => {
  const api = useSqueaky();

  const [tab, setTab] = React.useState<Tab>(Tab.DETAILS);
  const [site, setSite] = React.useState<Site>(null);

  const SiteCreateSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    url: Yup.string().url().required('Required'),
  });

  return (
    <SqueakyPage>
      <Wrapper size='lg'>
        <PageHeading>Add Site</PageHeading>

        <SiteCreateHeader tab={tab} />

        <h3>Enter your site details below</h3>

        <Formik
          initialValues={{ name: '', url: '' }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            (async () => {
              // TODO: Not sure how you're supposed to handle errors
              const response = await api.createSite(values.name, values.url);

              setSubmitting(false);

              if (response) {
                setSite(response.site);
                setTab(Tab.TRACKING);
              } else {
                setErrors({ name: 'Unlikely to be the problem', url: 'Probably exists already' });
              }
            })();
          }}
          validationSchema={SiteCreateSchema}
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
              <TextInput
                error={touched.name && errors.name}
                inputMode='text'
                labelText='Site Name'
                modSpaceAfter
                name='name'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={'e.g. My Website'}
                type='text'
                value={values.name}
                defaultValue={site?.name}
              />
              <TextInput
                error={touched.url && errors.url}
                inputMode='url'
                labelText='Site URL'
                modSpaceAfter
                name='url'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={'e.g. www.website.com'}
                type='url'
                value={values.url}
                defaultValue={site?.url}
              />
              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </form>
          )}
        </Formik>
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesNew;
