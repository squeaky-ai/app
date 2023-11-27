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
  value: RecordingsFilters['utmCampaign'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters>) => void;
}

const QUERY = gql`
  query GetSiteUtmCampaigns($siteId: ID!) {
    site(siteId: $siteId) {
      id
      utmCampaigns
    }
  }
`;

const UtmCampaignsSchema = Yup.object().shape({
  utmCampaign: Yup.string(),
});

export const FiltersUtmCampaigns: FC<Props> = ({ value, onClose, onUpdate }) => {
  const siteId = useSiteId();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId,
    }
  });

  const utmCampaigns = data ? data.site.utmCampaigns : [];

  const results = [...utmCampaigns].sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ utmCampaign: value }}
      validationSchema={UtmCampaignsSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.utmCampaign);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-utm filters-utm-campaigns' onSubmit={handleSubmit}>
          <div className='row utm-rows utm-campaigns'>
            {loading && <Spinner />}
            {results.map(utmCampaign => (
              <Radio 
                key={utmCampaign}
                name='utmCampaign'
                onBlur={handleBlur}
                onChange={handleChange}
                value={utmCampaign}
                checked={values.utmCampaign === utmCampaign}
              >
                {utmCampaign}
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
