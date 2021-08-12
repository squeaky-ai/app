import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SITE_QUERY } from 'data/sites/queries';
import type { Site } from 'types/site';

interface UseSite {
  loading: boolean;
  site: Site | null;
}

export const useSite = (): UseSite => {
  const router = useRouter();

  const { loading, data } = useQuery(GET_SITE_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  return {
    loading,
    site: data ? data.site : null
  };
};
