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
  value: RecordingsFilters['utmContent'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const QUERY = gql`
  query GetSiteUtmContents($siteId: ID!) {
    site(siteId: $siteId) {
      id
      utmContents
    }
  }
`;

const UtmContentsSchema = Yup.object().shape({
  utmContent: Yup.string(),
});

export const FiltersUtmContents: FC<Props> = ({ value, onClose, onUpdate }) => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const utmContents = data ? data.site.utmContents : [];

  const results = [...utmContents].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ utmContent: value }}
      validationSchema={UtmContentsSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.utmContent);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-utm filters-utm-contents' onSubmit={handleSubmit}>
          <div className='row utm-rows utm-contents'>
            {loading && <Spinner />}
            {results.map(utmContent => (
              <Radio 
                key={utmContent}
                name='utmContent'
                onBlur={handleBlur}
                onChange={handleChange}
                value={utmContent}
                checked={values.utmContent === utmContent}
              >
                {utmContent}
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
