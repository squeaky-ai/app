import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_SITE_BY_UUID_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';

interface UseSiteByUuid {
  loading: boolean;
  error: boolean;
  site: Site | null;
}

export const useSiteByUuid = (): UseSiteByUuid => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_SITE_BY_UUID_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  return {
    loading,
    error: !!error,
    site: data ? data.siteByUuid : null
  };
};
