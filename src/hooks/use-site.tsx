import { useQuery } from '@apollo/client';
import { GET_SITE_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseSite {
  loading: boolean;
  error: boolean;
  site: Site | null;
}

export const useSite = (): UseSite => {
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_SITE_QUERY, {
    variables: {
      siteId,
    },
    skip: !siteId,
  });

  return {
    loading,
    error: !!error,
    site: data ? data.site : null
  };
};
