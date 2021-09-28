import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Spinner } from 'components/spinner';
import type { Site } from 'types/site';

interface Props {
  onClose: VoidFunction;
}

const QUERY = gql`
  query GetSiteBrowsers($siteId: ID!) {
    site(siteId: $siteId) {
      id
      browsers
    }
  }
`;

const BrowsersSchema = Yup.object().shape({
  browsers: Yup.array(),
});

export const FiltersBrowsers: FC<Props> = ({ onClose }) => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const browsers = data ? data.site.browsers : [];

  return (
    <Formik
      initialValues={{ browsers: [] }}
      validationSchema={BrowsersSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-browsers' onSubmit={handleSubmit}>
          <div className='row browsers'>
            {loading && <Spinner />}
            {browsers.map(browser => (
              <Checkbox 
                key={browser}
                name='browsers'
                onBlur={handleBlur}
                onChange={handleChange}
                value={browser}
                checked={values.browsers.includes(browser)}
              >
                {browser}
              </Checkbox>
            ))}
          </div>

          <div className='actions'>
            <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
            <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
