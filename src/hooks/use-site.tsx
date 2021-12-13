import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SITE_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';

interface UseSite {
  loading: boolean;
  error: boolean;
  site: Site | null;
}

export const useSite = (): UseSite => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_SITE_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  return {
    loading,
    error: !!error,
    site: data ? data.site : null
  };
};
