import { gql, useQuery } from '@apollo/client';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseReferrers {
  loading: boolean;
  error: boolean;
  referrers: string[];
}

const QUERY = gql`
  query GetSiteReferrers($siteId: ID!) {
    site(siteId: $siteId) {
      id
      referrers
    }
  }
`;

export const useReferrers = (): UseReferrers => {
  const siteId = useSiteId();

  const { data, error, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId,
    }
  });

  const referrers = data ? data.site.referrers : [];

  return {
    loading,
    error: !!error,
    referrers: [...referrers].sort((a, b) => a.localeCompare(b)),
  };
};
