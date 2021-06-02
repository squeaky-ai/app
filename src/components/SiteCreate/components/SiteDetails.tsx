import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { Site } from 'data/sites/types';

interface SiteDetailsProps {
  site?: Site;
}

const SiteDetails: FC<SiteDetailsProps> = ({ site }) => {
  const SiteCreateSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    url: Yup.string().url().required('Required'),
  });

  return (
    <>
      <h3>Enter your site details below</h3>

      <Formik
        initialValues={{ name: '', url: '' }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          (async () => {
            console.log(values);
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
            />
            <Button type="submit" disabled={isSubmitting}>
              Continue
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SiteDetails;
