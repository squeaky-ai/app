import { useQuery } from '@apollo/client';
import { GET_SITE_BY_UUID_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseSiteByUuid {
  loading: boolean;
  error: boolean;
  site: Site | null;
}

export const useSiteByUuid = (): UseSiteByUuid => {
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_SITE_BY_UUID_QUERY, {
    variables: {
      siteId,
    }
  });

  return {
    loading,
    error: !!error,
    site: data ? data.siteByUuid : null
  };
};
