import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import { Spinner } from 'components/spinner';
import type { Site, RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['utmSource'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const QUERY = gql`
  query GetSiteUtmSources($siteId: ID!) {
    site(siteId: $siteId) {
      id
      utmSources
    }
  }
`;

const UtmSourceSchema = Yup.object().shape({
  utmSource: Yup.string(),
});

export const FiltersUtmSources: FC<Props> = ({ value, onClose, onUpdate }) => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const utmSources = data ? data.site.utmSources : [];

  const results = [...utmSources].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ utmSource: value }}
      validationSchema={UtmSourceSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.utmSource);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-utm filters-utm-sources' onSubmit={handleSubmit}>
          <div className='row utm-sources'>
            {loading && <Spinner />}
            {results.map(utmSource => (
              <Radio 
                key={utmSource}
                name='utmSource'
                onBlur={handleBlur}
                onChange={handleChange}
                value={utmSource}
                checked={values.utmSource === utmSource}
              >
                {utmSource}
              </Radio>
            ))}
            {results.length === 0 && !loading && (
              <div className='no-data'>
                <Icon name='time-line' />
                <p>No data</p>
              </div>
            )}
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
