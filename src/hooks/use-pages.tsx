import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { TimeRange } from 'types/common';
import type { Site, SitesPage } from 'types/graphql';

interface UsePages {
  loading: boolean;
  error: boolean;
  pages: SitesPage[];
}

interface Props {
  range: TimeRange
}

const QUERY = gql`
  query GetSitePages($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      pages(fromDate: $fromDate, toDate: $toDate) {
        url
        count
      }
    }
  }
`;

export const usePages = ({ range }: Props): UsePages => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...range,
    },
  });

  const pages = data ? data.site.pages : [];

  return {
    loading,
    error: !!error,
    pages,
  };
};
