import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { Site } from 'types/graphql';

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
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const referrers = data ? data.site.referrers : [];

  return {
    loading,
    error: !!error,
    referrers: [...referrers].sort((a, b) => a.localeCompare(b)),
  };
};
