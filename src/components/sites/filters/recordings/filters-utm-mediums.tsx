import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import { Spinner } from 'components/spinner';
import type { Site, RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  value: RecordingsFilters['utmMedium'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const QUERY = gql`
  query GetSiteUtmMediums($siteId: ID!) {
    site(siteId: $siteId) {
      id
      utmMediums
    }
  }
`;

const UtmMediumsSchema = Yup.object().shape({
  utmMedium: Yup.string(),
});

export const FiltersUtmMediums: FC<Props> = ({ value, onClose, onUpdate }) => {
  const siteId = useSiteId();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId,
    }
  });

  const utmMediums = data ? data.site.utmMediums : [];

  const results = [...utmMediums].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ utmMedium: value }}
      validationSchema={UtmMediumsSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.utmMedium);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-utm filters-utm-mediums' onSubmit={handleSubmit}>
          <div className='row utm-rows utm-mediums'>
            {loading && <Spinner />}
            {results.map(utmMedium => (
              <Radio 
                key={utmMedium}
                name='utmMedium'
                onBlur={handleBlur}
                onChange={handleChange}
                value={utmMedium}
                checked={values.utmMedium === utmMedium}
              >
                {utmMedium}
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
