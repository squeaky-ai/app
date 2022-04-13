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
  value: RecordingsFilters['utmTerm'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const QUERY = gql`
  query GetSiteUtmTerms($siteId: ID!) {
    site(siteId: $siteId) {
      id
      utmTerms
    }
  }
`;

const UtmTermsSchema = Yup.object().shape({
  utmTerms: Yup.string(),
});

export const FiltersUtmTerms: FC<Props> = ({ value, onClose, onUpdate }) => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const utmTerms = data ? data.site.utmTerms : [];

  const results = [...utmTerms].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ utmTerm: value }}
      validationSchema={UtmTermsSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.utmTerm);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-utm filters-utm-terms' onSubmit={handleSubmit}>
          <div className='row utm-rows utm-terms'>
            {loading && <Spinner />}
            {results.map(utmTerm => (
              <Radio 
                key={utmTerm}
                name='utmTerm'
                onBlur={handleBlur}
                onChange={handleChange}
                value={utmTerm}
                checked={values.utmTerm === utmTerm}
              >
                {utmTerm}
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
