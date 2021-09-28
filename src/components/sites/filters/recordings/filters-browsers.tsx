import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Checkbox } from 'components/checkbox';
import { Spinner } from 'components/spinner';
import type { Site } from 'types/site';

const QUERY = gql`
  query GetSiteBrowsers($siteId: ID!) {
    site(siteId: $siteId) {
      id
      browsers
    }
  }
`;

export const FiltersBrowsers: FC = () => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const browsers = data ? data.site.browsers : [];

  return (
    <form className='filters-browsers'>
      <div className='row browsers'>
        {loading && <Spinner />}
        {browsers.map(browser => (
          <Checkbox key={browser}>{browser}</Checkbox>
        ))}
      </div>
    </form>
  );
};
