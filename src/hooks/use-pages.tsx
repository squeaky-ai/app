import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { Site } from 'types/site';

interface UsePages {
  loading: boolean;
  error: boolean;
  pages: string[];
}

const QUERY = gql`
  query GetSitePages($siteId: ID!) {
    site(siteId: $siteId) {
      id
      pages
    }
  }
`;

export const usePages = (): UsePages => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const pages = data ? data.site.pages : [];

  return {
    loading,
    error: !!error,
    pages: [...pages].sort((a, b) => a.localeCompare(b)),
  };
};
