import React from 'react';
import type { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import type { Site } from 'types/site';

const QUERY = gql`
  query GetActiveVisitorCount($siteId: ID!) {
    site(siteId: $siteId) {
      id
      activeVisitorCount
    }
  }
`;

interface Props {
  site: Site;
}

export const OverviewActiveVisitorsCount: FC<Props> = ({ site }) => {
  const { data, startPolling, stopPolling } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: site.id
    }
  });

  React.useEffect(() => {
    startPolling(2500);

    return () => stopPolling();
  }, []);

  console.log(data);

  return null;
};
