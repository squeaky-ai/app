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
  const [siteId, skip] = useSiteId();

  const { loading, error, data } = useQuery(GET_SITE_QUERY, {
    variables: {
      siteId,
    },
    skip,
  });

  return {
    loading: loading || skip, // This is a special case or we'll see the 404 page while the router loads
    error: !!error,
    site: data ? data.site : null
  };
};
