import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Spinner } from 'components/spinner';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  value: string[];
  onClose: VoidFunction;
  onUpdate: (value: string[]) => void;
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

export const FiltersBrowsers: FC<Props> = ({ value, onClose, onUpdate }) => {
  const siteId = useSiteId();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId,
    }
  });

  const browsers = data ? data.site.browsers : [];

  const results = [...browsers].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ browsers: value }}
      validationSchema={BrowsersSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.browsers);
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
            {results.map(browser => (
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
